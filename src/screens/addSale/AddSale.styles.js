import tw from 'tailwind-styled-components';
import {DepositManagers} from "../tab/depositManager/DepositManager.styles";

export const AddSaleStyle = tw.div``

AddSaleStyle.Header = tw.div`
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

AddSaleStyle.Body = tw.div`
    w-full
    h-[calc(100vh-theme(spacing.header))]
    bg-[#fff]
    p-[20px]
    flex
    justify-center
    gap-[30px]
`
AddSaleStyle.Left = tw.form`
    flex
    flex-col
    rounded-[7px]
    bg-[#F0F4FF]
    w-[40%]
    h-fit
    overflow-hidden
`