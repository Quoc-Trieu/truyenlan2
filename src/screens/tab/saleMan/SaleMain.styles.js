import tw from "tailwind-styled-components";
import {User} from "../userMan/UserMan.styles";

export const Sale = tw.div`
    w-full
    h-full
    bg-background
    overflow-y-auto
`

Sale.ButtonSale = tw.button`
    w-[200px]
    h-[50px]
    bg-[#000650]
    text-[#fff]
    rounded-[50px]
    text-[18px]
    font-[600]
    outline-none
    border-none
    mt-[20px]
    mb-[20px]
    ml-[30px]
    transition-all
    duration-300
`

Sale.Header = tw.div`
    h-header
    flex
    justify-between
    items-center
    px-[50px]
    bg-[#fff]
`
Sale.HeaderTitle = tw.span`
    text-[26px]
    text-[#000650]
    font-[600]
`
Sale.HeaderBoxinput = tw.div`
    flex
    justify-between
    border-[1.5px]
    border-[rgba(33,40,107,0.5)]
    border-solid
    px-[5px]
    py-[5px]
    rounded-[50px]
`


Sale.HeaderInput = tw.input`
    w-[250px]
    bg-transparent
    text-[18px]
    pl-[15px]
    outline-none
`

Sale.HeaderIcon = tw.img`
    w-[45px]
    h-[45px]
`
Sale.Body = tw.div`
    p-[30px]
    h-[calc(100%-theme(spacing.header))]
    flex
    flex-col
    justify-between
    items-center
`
Sale.Table = tw.table`
    w-full
    border-separate
    border-spacing-y-[20px]
`
Sale.TrHead = tw.tr`
`
Sale.Tr = tw.tr`
    h-fit
    bg-[#fff]
`
Sale.Th = tw.th`
    text-start
    px-[30px]
    pt-[25px]
`
Sale.Td = tw.td`
    h-fit
    px-[30px]
    py-[20px]
`
Sale.Panage = tw.div`
    flex
    gap-[20px]
    items-center
`
Sale.PanageBtn = tw.button`
    px-[20px]
    py-[15px]
    bg-[#fff]
    rounded-[3px]
    text-[17px]
    cursor-pointer
`
Sale.PanageNumber = tw.div`
    text-[#000650]
    text-[20px]
    font-[600]
`



