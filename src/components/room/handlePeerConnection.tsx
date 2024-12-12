import Peer, { SignalData } from "simple-peer";

interface Devices {
  isMicOn: boolean;
  isCameraOn: boolean;
  selectedMic: string;
  selectedSpeaker: string;
  selectedCamera: string;
  status: boolean;
}

export default async function handlePeerConnection(
  data: Devices,
  localVideoRef: React.RefObject<HTMLVideoElement>,
  remoteVideoRefs: React.MutableRefObject<{ [key: string]: HTMLVideoElement }>,
  socket: any,
  peers: { [key: string]: Peer.Instance },
  setPeers: React.Dispatch<React.SetStateAction<{ [key: string]: Peer.Instance }>>,
  room_code: string
) {
  if (!data.status || (!data.isMicOn && !data.isCameraOn)) {
    alert("Devices are not ready or active.");
    return;
  }

  const constraints: MediaStreamConstraints = {
    audio: data.isMicOn ? { deviceId: data.selectedMic ? { exact: data.selectedMic } : undefined } : false,
    video: data.isCameraOn ? { deviceId: data.selectedCamera ? { exact: data.selectedCamera } : undefined } : false,
  };

  const TURN_SERVER_CONFIG = {
    iceServers: [
        {
          urls: "stun:stun.relay.metered.ca:80",
        },
        {
          urls: "turn:global.relay.metered.ca:80",
          username: "69f829afeb5224e9ddf75a31",
          credential: "MAfZhLk3cf3ncot1",
        },
        {
          urls: "turn:global.relay.metered.ca:80?transport=tcp",
          username: "69f829afeb5224e9ddf75a31",
          credential: "MAfZhLk3cf3ncot1",
        },
        {
          urls: "turn:global.relay.metered.ca:443",
          username: "69f829afeb5224e9ddf75a31",
          credential: "MAfZhLk3cf3ncot1",
        },
        {
          urls: "turns:global.relay.metered.ca:443?transport=tcp",
          username: "69f829afeb5224e9ddf75a31",
          credential: "MAfZhLk3cf3ncot1",
        },
      ],
  };

 await navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log("Local stream acquired:", stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.onloadedmetadata = () => {
          localVideoRef.current?.play().catch((err) => console.log("Error playing local video:", err));
        };
      }

      socket.on("participant-join", ({ peerId, roomCode }: { peerId: string; roomCode: string }) => {
        if (roomCode !== room_code) {
          console.warn(`Ignored join request from different room: ${roomCode}`);
          return;
        }

        console.log("Participant joined:", peerId);

        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
          config: TURN_SERVER_CONFIG,
        });

        peer.on("signal", (signal: SignalData) => {
          socket.emit("signal", { signal, targetPeerId: peerId, roomCode: room_code });
        });

        peer.on("stream", (remoteStream: MediaStream) => {
          if (remoteVideoRefs.current[peerId]) {
            remoteVideoRefs.current[peerId].srcObject = remoteStream;
            remoteVideoRefs.current[peerId].play();
          }
        });

        peer.on("error", (err) => console.log("Peer error:", err));
        peer.on("close", () => {
          setPeers((prevPeers) => {
            const { [peerId]: _, ...rest } = prevPeers;
            return rest;
          });
        });

        setPeers((prevPeers) => ({ ...prevPeers, [peerId]: peer }));
      });

      socket.on(
        "signal",
        ({ signal, sourcePeerId, roomCode }: { signal: SignalData; sourcePeerId: string; roomCode: string }) => {
          if (roomCode !== room_code) {
            console.warn(`Ignored signal from different room: ${roomCode}`);
            return;
          }

          if (!peers[sourcePeerId]) {
            const peer = new Peer({
              initiator: false,
              trickle: false,
              stream,
              config: TURN_SERVER_CONFIG,
            });

            peer.on("signal", (signal: SignalData) => {
              socket.emit("signal", { signal, targetPeerId: sourcePeerId, roomCode: room_code });
            });

            peer.on("stream", (remoteStream: MediaStream) => {
              if (remoteVideoRefs.current[sourcePeerId]) {
                remoteVideoRefs.current[sourcePeerId].srcObject = remoteStream;
                remoteVideoRefs.current[sourcePeerId].play();
              }
            });

            setPeers((prevPeers) => ({ ...prevPeers, [sourcePeerId]: peer }));
          }

          peers[sourcePeerId].signal(signal);
        }
      );

      socket.on("participant-leave", ({ peerId, roomCode }: { peerId: string; roomCode: string }) => {
        if (roomCode !== room_code) {
          return;
        }

        if (peers[peerId]) {
          peers[peerId].destroy();
          setPeers((prevPeers) => {
            const { [peerId]: _, ...rest } = prevPeers;
            return rest;
          });
        }
      });
    })
    .catch((err) => {
      console.log("Error accessing media devices:", err);
    });
}
