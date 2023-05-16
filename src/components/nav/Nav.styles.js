import tw from 'tailwind-styled-components';

export const NavWapper = tw.div`
    flex
    flex-col
    h-full
    justify-between
    bg-[#17254E]
    relative
`
NavWapper.Open = tw.div`
    flex
    flex-col
    h-screen
    justify-between
    bg-[#17254E]
    relative

`
NavWapper.IconClose = tw.img`
    md:hidden

`
NavWapper.Ul = tw.ul`
    flex
    flex-col
    justify-center
    items-center
    p-0
`
NavWapper.Li = tw.li`
    w-full
    text-[14px]
    flex
    items-center
    gap-[20px]
    h-[90px]
    text-[#fff]
    font-light
    cursor-pointer
    relative
    after:content-['']
    after:w-full
    after:h-[1px]
    after:bg-[#ccc]
    after:absolute
    after:bottom-[0px]
    
`
NavWapper.Img = tw.img`
    w-[30px]
    h-[30px]

`
NavWapper.Span = tw.span`
    max-md:text-[18px]
`
NavWapper.Out = tw.div`
    flex
    text-[14px]
    flex-col
    justify-center
    items-center
    gap-[10px]
    py-[20px]
    text-[#fff]
    cursor-pointer
    font-light
`