import React,{ useState, useEffect} from 'react'
import {FormContentWrapper,FormInput,FormResult,FormTitle,FormWrapper,HeaderTitle,MainWrapper} from '../styles/FormStyledCom'

const Form = () => {

    const [chkDaily,setChkDaily] = useState(false)
    const [dailyStateDate,setDailyStateDate] = useState("")
    const [dailyStatePrice,setDailyStatePrice] = useState("1000")
    const [dailyStateSummary,setDailyStateSummary] = useState()

    const [chkCost,setChkCost] = useState(false)
    const [costStateDate,setCostStateDate] = useState("")
    const [costStatePrice,setCostStatePrice] = useState("500")
    const [costStateSummary,setCostStateSummary] = useState()

    const [fixCostSummary,setFixCostSummary] = useState()
    const [percent,setPercent] = useState(0)
    const [profit,setProfit] = useState()
    const [sumProfit,setSumProfit] = useState()

    const [tax,setTax] = useState(3)
    const [calTax,setCalTax] = useState()

    const [allSummary,setAllSummary] = useState()


    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const onChangeDailyDate = (e) => {
        setDailyStateDate(e.target.value)
        setChkDaily(true)
    }

    const onChangeDailyPrice = (e) => {
        setDailyStatePrice(e.target.value)
        setChkDaily(true)
    }

    const onChangeCostDate = (e) => {
        setCostStateDate(e.target.value)
        setChkCost(true)
    }
    
    const onChangeCostPrice = (e) => {
        setCostStatePrice(e.target.value)
        setChkCost(true)
    }

    const onChangePercent = (e) => {
        setPercent(e.target.value)
    }

    const percentCal = (percent) => {
        return (percent/100)
    }

    const onChangeTax = (e) => {
        setTax(e.target.value)
    }

    useEffect(()=>{
        if(chkDaily){
            setDailyStateSummary(parseInt(dailyStatePrice) * (parseInt(dailyStateDate)))
            setChkDaily(false)
        }

        if(chkCost){
            setCostStateSummary(parseInt(costStatePrice) * (parseInt(costStateDate)))
            setChkCost(false)
        }

        if(dailyStateSummary && costStateSummary){
            setFixCostSummary(dailyStateSummary+costStateSummary)
        }

        if(percent && fixCostSummary){
            setProfit(percentCal(percent) * parseInt(fixCostSummary))
        }

        if(profit && fixCostSummary) {
            setSumProfit(profit + fixCostSummary)
        }

        if(tax && sumProfit){
            setCalTax(sumProfit*(tax/100))
        }

        if(calTax && sumProfit){
            setAllSummary(calTax+sumProfit)
        }

    },[calTax, chkCost, chkDaily, costStateDate, costStatePrice, costStateSummary, dailyStateDate, dailyStatePrice, dailyStateSummary, fixCostSummary, percent, profit, sumProfit, tax])

    

    return (
        <MainWrapper>
            <HeaderTitle textContent={"Projects Pricing Calculator"} />
            <FormWrapper>
                <FormContentWrapper>
                    <FormTitle textContent={"ค่าแรงต่อวัน"} />
                    <FormInput type={"number"} min={"0"} placeholder={"จำนวนวัน"} onChange={onChangeDailyDate} value={dailyStateDate ? dailyStateDate : ""} />
                    <FormTitle textContent={"วัน"} />
                    <FormInput type={"number"} min={"0"} placeholder={"จำนวนค่าแรง"} onChange={onChangeDailyPrice} value={dailyStatePrice ? dailyStatePrice : ""} />
                    <FormTitle textContent={"บาท"} />
                </FormContentWrapper>
                <FormContentWrapper>
                    <FormTitle textContent={"ต้นทุนอื่นๆต่อวัน"} />
                    <FormInput type={"number"} min={"0"} placeholder={"จำนวนวัน"} onChange={onChangeCostDate} value={costStateDate ? costStateDate : ""} />
                    <FormTitle textContent={"วัน"} />
                    <FormInput type={"number"} min={"0"} placeholder={"จำนวนต้นทุนอื่นๆ"} onChange={onChangeCostPrice} value={costStatePrice ? costStatePrice : ""} />
                    <FormTitle textContent={"บาท"} />
                </FormContentWrapper>
                <FormContentWrapper>
                    <FormTitle textContent={"ต้นทุนรวม"} />
                    <FormResult textContent={`${numberWithCommas(dailyStateSummary ? parseInt(dailyStateSummary) : 0)} บาท`} />
                    <FormTitle textContent={"+"} />
                    <FormResult textContent={`${numberWithCommas(costStateSummary ? parseInt(costStateSummary) : 0)} บาท`} />
                    <FormTitle textContent={"="} />
                    <FormResult textContent={`${numberWithCommas(fixCostSummary ? fixCostSummary : 0 )} บาท`} />
                </FormContentWrapper>
                <FormContentWrapper>
                    <FormTitle textContent={"กำไร (%)"} />
                    <FormInput type={"number"} min={"0"} placeholder={"จำนวนเปอเซ็นต์"} onChange={onChangePercent} value={percent ? percent : ""} />
                    <FormResult textContent={`${numberWithCommas(profit ? parseInt(profit) : 0)} บาท`} />
                    <FormTitle textContent={"+"} />
                    <FormResult textContent={`${numberWithCommas(fixCostSummary ? fixCostSummary : 0 )} บาท`} />
                    <FormTitle textContent={"="} />
                    <FormResult textContent={`${numberWithCommas(sumProfit ? sumProfit : 0 )} บาท`} />
                </FormContentWrapper>
                <FormContentWrapper>
                    <FormTitle textContent={"ภาษีหัก ณ ที่จ่าย (%)"} />
                    <FormInput type={"number"} min={"0"} placeholder={"จำนวนเปอเซ็นต์"} onChange={onChangeTax} value={tax ? tax : ""} />
                    <FormResult textContent={`${numberWithCommas(calTax ? calTax : 0)} บาท`} />
                </FormContentWrapper>
                <FormContentWrapper>
                    <FormTitle textContent={"รวม"} />
                    <FormResult textContent={`${numberWithCommas(allSummary ? allSummary : 0)} บาท`} />
                </FormContentWrapper>
            </FormWrapper>
        </MainWrapper>
    )
}

export default Form
