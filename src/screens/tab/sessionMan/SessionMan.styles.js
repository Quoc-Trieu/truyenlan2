import tw from 'tailwind-styled-components';

export const SessionMan = tw.div`

`

SessionMan.Header = tw.div`
    h-header
    flex
    justify-start
    items-center
    bg-[#fff]
    p-[20px]
    text-[26px]
    text-[#000650]
    font-[600]
`
SessionMan.Body = tw.div`
    w-full
    h-[calc(100vh-theme(spacing.header))]
    bg-[#fff]
    p-[20px]
    flex
    gap-[30px]
`
SessionMan.Left = tw.div`
    flex-[2]
    flex
    flex-col
    gap-[20px]
`
SessionMan.LeftTop = tw.div`
    flex
    flex-col
    gap-[15px]
    justify-center
    p-[20px]
    bg-[#F0F4FF]
    rounded-[7px]
`
SessionMan.BoxValue = tw.div`
    flex
    flex-col
    gap-[7px]
    text-[#21286B]
`
SessionMan.BoxValueNumber = tw.div`
    w-full
    h-[50px]
    flex
    justify-around
    items-center
    rounded-[5px]
`
SessionMan.IconValue = tw.img`
    w-[35px]
`
SessionMan.TitileBox = tw.span`
    font-bold
    text-[#fff]
`
SessionMan.LeftBottom = tw.div`
    flex
    flex-col
    gap-[7px]
    items-center
    rounded-[7px]
    bg-[#F0F4FF]
    py-[15px]
`
SessionMan.Right = tw.div`
    flex-[8]
    bg-[#F0F4FF]
    rounded-[7px]
    h-[90%]
    overflow-auto
`
SessionMan.Table = tw.table`
    w-full
    border-separate
    border-spacing-y-[15px]
    h-[150px]
    overflow-auto
    px-[15px]
`
SessionMan.TrHead = tw.tr`
`
SessionMan.Tr = tw.tr`
    bg-[#fff]
    rounded-[7px]
`
SessionMan.Th = tw.th`
    text-start
    py-[20px]
    border-0
`
SessionMan.Td = tw.td`
    text-start
    py-[20px]
`