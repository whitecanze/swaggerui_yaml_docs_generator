import React,{ useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {FormContentWrapper,FormInput,FormResult,FormTitle,FormWrapper,HeaderButton,HeaderTitle,HeaderWrapper,MainWrapper} from '../styles/FormStyledCom'
import {FcHome} from 'react-icons/fc'

const Form = () => {

    const history = useHistory()
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
            <HeaderWrapper>
                <HeaderTitle textContent={"Projects Pricing Calculator"}/>
                <HeaderButton onClick={_=>history.push('/')}><FcHome size={"1.5vw"} /></HeaderButton>
            </HeaderWrapper>
            <FormWrapper>
                <FormContentWrapper>
                    <FormTitle fontWeight={"500"} textContent={"????????????????????????????????????"} />
                    <FormInput type={"number"} min={"0"} placeholder={"????????????????????????"} onChange={onChangeDailyDate} value={dailyStateDate ? dailyStateDate : ""} />
                    <FormTitle textContent={"?????????"} />
                    <FormInput type={"number"} min={"0"} step={"100"} placeholder={"?????????????????????????????????"} onChange={onChangeDailyPrice} value={dailyStatePrice ? dailyStatePrice : ""} />
                    <FormTitle textContent={"?????????"} />
                </FormContentWrapper>
                <FormContentWrapper>
                    <FormTitle fontWeight={"500"} textContent={"???????????????????????????????????????????????????"} />
                    <FormInput type={"number"} min={"0"} placeholder={"????????????????????????"} onChange={onChangeCostDate} value={costStateDate ? costStateDate : ""} />
                    <FormTitle textContent={"?????????"} />
                    <FormInput type={"number"} min={"0"} step={"100"} placeholder={"????????????????????????????????????????????????"} onChange={onChangeCostPrice} value={costStatePrice ? costStatePrice : ""} />
                    <FormTitle textContent={"?????????"} />
                </FormContentWrapper>
                <FormContentWrapper>
                    <FormTitle fontWeight={"500"} textContent={"???????????????????????????"} />
                    <FormResult textContent={`${numberWithCommas(dailyStateSummary ? parseInt(dailyStateSummary) : 0)} ?????????`} />
                    <FormTitle textContent={"+"} />
                    <FormResult textContent={`${numberWithCommas(costStateSummary ? parseInt(costStateSummary) : 0)} ?????????`} />
                    <FormTitle textContent={"="} />
                    <FormResult textContent={`${numberWithCommas(fixCostSummary ? fixCostSummary : 0 )} ?????????`} />
                </FormContentWrapper>
                <FormContentWrapper>
                    <FormTitle fontWeight={"500"} textContent={"???????????? (%)"} />
                    <FormInput type={"number"} min={"20"} step={"10"} placeholder={"??????????????????????????????????????????"} onChange={onChangePercent} value={percent ? percent : ""} />
                    <FormResult textContent={`${numberWithCommas(profit ? parseInt(profit) : 0)} ?????????`} />
                    <FormTitle textContent={"+"} />
                    <FormResult textContent={`${numberWithCommas(fixCostSummary ? fixCostSummary : 0 )} ?????????`} />
                    <FormTitle textContent={"="} />
                    <FormResult textContent={`${numberWithCommas(sumProfit ? sumProfit : 0 )} ?????????`} />
                </FormContentWrapper>
                <FormContentWrapper>
                    <FormTitle fontWeight={"500"} textContent={"????????????????????? ??? ????????????????????? (%)"} />
                    <FormInput type={"number"} min={"3"} placeholder={"??????????????????????????????????????????"} onChange={onChangeTax} value={tax ? tax : ""} />
                    <FormResult textContent={`${numberWithCommas(calTax ? calTax : 0)} ?????????`} />
                </FormContentWrapper>
                <FormContentWrapper>
                    <FormTitle fontWeight={"500"} textContent={"?????????"} />
                    <FormResult color={"green"} fontWeight={"500"} underline textContent={`${numberWithCommas(allSummary ? allSummary : 0)} ?????????`} />
                </FormContentWrapper>
            </FormWrapper>
        </MainWrapper>
    )
}

export default Form
