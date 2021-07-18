import styled from 'styled-components'

export const MainPageWrapper = styled.div`
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100%;
    color: #fff;
    background-color: #222;
`
export const MainHeader = styled.div`
    // position: relative;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 10%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to top, #008aff, #00ffe7);
    animation: animateprogressbar 5s linear infinite;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, #008aff, #00ffe7);
        filter: blur(10px);
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, #008aff, #00ffe7);
        filter: blur(10px);
    }
    @keyframes animateprogressbar {

        0%,100% {
            filter: hue-rotate(0deg);
        }
        50% {
            filter: hue-rotate(360deg);
        }
    }
`

export const PageButton = styled.button`
    position: absolute;
    width: auto;
    height: auto;
    right: 1vw;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    z-index: 2;
`

export const MainHeaderText = styled.h1`
    font-size: 2vw;
    text-shadow: 0 0 10px #000;
    z-index: 2;
`
export const MainContentBody = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: row;
`
export const MainConntentBodyLeft = styled.div`
    width: 50%;
    height: auto;
    padding: 2vh 5vw 5vh 5vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`
export const ContentTitle = styled.h4`
    font-size: 1.1vw;
    padding: 1vh 0;
    color: #77e775;

    &:before {
        content: '${({contenttext}) => contenttext ? contenttext : ''}'
    }
`

export const ContentSub = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    padding: 1vh 0;
    gap: 1vw;
`
export const InputBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .25vw;
`
export const ContentSubInput = styled.input``
export const ContentSelect = styled.select`
    background-color: #333;
    color: #77e775;
    outline: none;
    border: none;
    font-size: 1.25vw;
    width: 10vw;
`
export const ContentSelectOption = styled.option`
    color: #77e775;
    background-color: #222;

`
export const ContentSubInputCheckbox = styled(ContentSubInput).attrs(props => ({
    type: "checkbox"
}))`
    width: 1vw;
    height: 1vw;
    color: #77e775; 
`
export const ContentSubInputText = styled(ContentSubInput).attrs(props => ({
    type: "text"
}))`
    border: none;
    background-color: transparent;
    color: #77e775;
    outline: none;
    border-bottom: solid 2px #aaa;
    font-size: 1vw;
    padding: .5vh .25vw;
    text-shadow: 0px 0px 5px;

    &.notempty{
        border-bottom: solid 2px #77e775;
    }

    &:focus{
        border-bottom: solid 2px #77e775;
    }
`

export const ContentSubInputlabel = styled.label`
    font-size: .9vw;

    &.selected {
        color: #77e775;
        text-shadow: 0px 0px 5px;
    }

    &:before {
        content: '${({contenttext}) => contenttext ? contenttext : ''}'
    }
`
export const MainConntentBodyRight = styled.div`
    width: 50%;
    height: 90vh;
    background-color: #222;
    padding: 2vh 3vw 0 1vw;
    display: flex;
    flex-direction: column;
`
export const DisplayArea = styled.textarea`
    width: 100%;
    height: 85vh;
    background-color: #333;
    resize: none;
    outline: none;
    padding: 1vh 1vw;
    font-size: 1.2vw;
    color: #77e775;
    text-shadow: 0px 0px 5px;
    border: solid 1px #77e775;

    /* width */
    ::-webkit-scrollbar {
        width: 20px;
        overflow: hidden;
        background: rgba(20, 20, 20, 1);
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: rgba(20, 20, 20, 1);
        border-radius: 13px;
        cursor: pointer;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(0deg, rgba(20, 20, 20, 1), #77e775);
        border-radius: 13px;

    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(0deg, #77e775, rgba(20, 20, 20, 1));
    }
`
export const ConsoleArea = styled.div`
    width: 100%;
    height: 5vh;
    background-color: #000;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border: solid 1px #77e775;
    position: relative;
`
export const ConsoleButton = styled.button`
    width: auto;
    height: auto;
    border: none;
    outline: none;
    padding: .5vh 2vw;
    border-radius: 1vw;
    font-size: .8vw;
    margin: 0 .5vw;
    color: #fff;

    ${({primaryTheme}) => primaryTheme ? `
        background: linear-gradient(90deg, #0162c8, #55e7fc);
        &:hover{
            box-shadow: 0 2px 5px #0162c8;
            color: #55e7fc;
            background: #0162c8;
        }
    `
    : ({secondaryTheme}) => secondaryTheme ? 
    `
        background: linear-gradient(90deg, #55e7fc, #77e775);
        &:hover{
            box-shadow: 0 2px 5px #55e7fc;
            color: #77e775;
            background: #55e7fc;
        }
    `
    : ({hotTheme}) => hotTheme ? 
    `
        background: linear-gradient(90deg, #e85a19, #f5ce62);
        &:hover{
            box-shadow: 0 2px 5px #e85a19;
            color: #f5ce62;
            background: #e85a19;
        }
    `
    :
    `
        background: linear-gradient(90deg, #755bea, #ff72c0);
        &:hover{
            box-shadow: 0 2px 5px #755bea;
            color: #ff72c0;
            background: #755bea;
        }
    `
    }
`

export const AlertAction = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
`

export const AlertActionContent = styled.div`
    width: 15vw;
    font-size: 2vw;
    height: auto;
    background-color: #555;
    border-radius: 1vw;
    border: solid 5px #77e775;
    color: #77e775;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2vh 3vw;

    &:before {
        content: '${({contenttext})=> contenttext ? contenttext : ''}';
    }
`

export const AddBtn = styled.label`
    text-decoration: underline;
    color: #ff72c0;
    cursor: pointer;
    font-size: 1vw;

    &:hover{
        text-shadow: 0 0 5px #ff72c0;
    }

    &:before {
        content: '${({contenttext}) => contenttext ? contenttext : ''}';
    }
`

export const DataList = styled.ul`
    margin: 1vh 0;
    width: 25vw;
    background-color: #222;
`
export const DataListItemsBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    gap: .2vw;
`
export const DataListItems = styled.li`
    color: #77e775;
    padding: .5vh 1vw;
    list-style-type: none;
    background-color: #333;
    border: solid 1px #222;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 20vw;
    font-size: 1.25vw;

    &:before {
        content: '${({contenttext}) => contenttext ? contenttext : ''}';
    }
`
export const DeleteDataItems = styled.button`
    background-color: #333;
    border: solid 1px #222;
    font-size: 1.25vw;
    color: #ff72c0;
    padding: .25vh .5vw;
    width: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;

    &:hover{
        text-shadow: 0 0 5px #ff72c0;
    }
`

export const SchemaGenerateFormBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(000,000,000,.7);
    z-index: 3;
`
export const SchemaGenerateForm = styled.div`
  width: 35vw;
  font-size: 2vw;
  height: auto;
  background-color: #333;
  border-radius: 1vw;
  border: solid 5px #77e775;
  color: #77e775;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vh 3vw;
`;

export const FormBtn = styled(AddBtn)`
    ${({primaryTheme}) => primaryTheme && `
        color: #77e775;
        font-size: 2vw;
        &:hover{
            text-shadow: 0 0 5px #77e775;
        }

        &:disabled{
            color: #777;
        }
    `}
    ${({secondaryTheme}) => secondaryTheme &&
    `
        color: #e85a19;
        font-size: 1vw;
        &:hover{
            text-shadow: 0 0 5px #e85a19;
        }

        &:disabled{
            color: #777;
        }
    `}

    &:before {
        content: '${({contenttext}) => contenttext ? contenttext : ''}';
    }
`

export const GenerateBtn = styled.button`
    width: auto;
    height: auto;
    border: none;
    outline: none;
    padding: 1vh .65vw;
    border-radius: 50%;
    margin-right: 64%;
    font-size: .7vw;
    color: #fff;
    background: linear-gradient(90deg, #55e7fc, #77e775);
    display: flex;
    justify-content: center;
    align-items: center;
    /* position: absolute;
    top: 10%;
    left: 1%; */

    &:hover{
        box-shadow: 0 2px 5px #55e7fc;
        background-color: #55e7fc;
        color: #fff;
    }
`