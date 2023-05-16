import tw from 'tailwind-styled-components'

export const User = tw.div`
    w-full
    h-full
    bg-background
    overflow-y-auto
`
User.Header = tw.div`
    h-header
    flex
    justify-between
    items-center
    px-[50px]
    bg-[#fff]
`
User.HeaderTitle = tw.span`
    text-[26px]
    text-[#000650]
    font-[600]
`
User.HeaderBoxinput = tw.div`
    flex
    justify-between
    border-[1.5px]
    border-[rgba(33,40,107,0.5)]
    border-solid
    px-[5px]
    py-[5px]
    rounded-[50px]
`
User.HeaderInput = tw.input`
    w-[250px]
    bg-transparent
    text-[18px]
    pl-[15px]
    outline-none
`
User.HeaderIcon = tw.img`
    w-[45px]
    h-[45px]
`
User.Body = tw.div`
    p-[30px]
    h-[calc(100%-theme(spacing.header))]
    flex
    flex-col
    justify-between
    items-center
`
User.Table = tw.table`
    w-full
    border-separate
    border-spacing-y-[20px]
`
User.TrHead = tw.tr`
`
User.Tr = tw.tr`
    h-fit
    bg-[#fff]
`
User.Th = tw.th`
    text-start
    px-[30px]
    pt-[25px]
`
User.Td = tw.td`
    h-fit
    px-[30px]
    py-[20px]
`
User.Panage = tw.div`
    flex
    gap-[20px]
    items-center
`
User.PanageBtn = tw.button`
    px-[20px]
    py-[15px]
    bg-[#fff]
    rounded-[3px]
    text-[17px]
    cursor-pointer
`
User.PanageNumber = tw.div`
    text-[#000650]
    text-[20px]
    font-[600]
`