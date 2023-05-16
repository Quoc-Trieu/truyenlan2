import tw from 'tailwind-styled-components'

export const Head = tw.div`
    w-full
    flex
    justify-center
    items-center
    h-header

    max-md:justify-between
    max-md:px-[15px]
`
Head.Text = tw.span`
    text-[#93B2EC]
    font-bold
    text-[27px]
    uppercase

    max-md:text-[18px]
`
Head.Icon = tw.img`
    md:hidden

    w-[35px]
    h-[35px]
`