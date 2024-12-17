import Image from 'next/image'

export function Logo(props: {className?: string}) {
  return (
    <Image
      src={"/images/logo/keetlo-logo-header.png"}
      height={50}
      width={50}
      alt="Keetlo logo"
      className='py-4'
    />
  )
}
