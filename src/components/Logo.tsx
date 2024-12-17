import Image from 'next/image'

export function Logo() {
  return (
    <div>
    <Image
      src={"/images/logo/keetlo-logo-header.png"}
      height={50}
      width={50}
      alt="Keetlo logo"
      className='py-2'
    />
    </div>
  )
}
