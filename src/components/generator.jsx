import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {FaPlay} from 'react-icons/fa'
import {FcCalculator} from 'react-icons/fc'
import {
    MainPageWrapper,
    PageButton,
    MainHeader,
    MainHeaderText,
    MainContentBody,
    MainConntentBodyLeft,
    ContentTitle,
    ContentSub,
    InputBox,
    AddBtn,
    SchemaGenerateFormBox,
    SchemaGenerateForm,
    ContentSubInputText,
    ContentSubInputlabel,
    ContentSubInputCheckbox,
    MainConntentBodyRight,
    DisplayArea,
    ConsoleArea,
    ConsoleButton,
    ContentSelect,
    ContentSelectOption,
    AlertAction,
    AlertActionContent,
    DataList,
    DataListItemsBox,
    DataListItems,
    DeleteDataItems,
    FormBtn,
    GenerateBtn
} from '../styles/styledCom'


const Generator = () => {

    const history = useHistory()
    const [copied,setCopied] = useState(false)
    const [addData,setAddData] = useState(false)
    const [addRequestBox, setAddRequestBox] = useState(false);
    const [addRequest,setAddRequest] = useState(false)
    const [addResponse,setAddResponse] = useState(false)
    const [dataEndpoint,setDataEndpoint] = useState({endpoint: ""})
    const [methodData,setMethodData] = useState({
      summary: "",
      tags: "",
      description: "",
      security: false
    })
    const [selectMethod,setSelectMethod] = useState("get")
    const [getParameter,setGetParameter] = useState("non_parameter")
    const [parameterData,setParameterData] = useState({
      name: "",
      description: "",
      required: true,
      type: "",
      example: ""
    })
    const [addResponseData,setAddResponseData] = useState({
      status: "",
      description: "",
      content: false
    })
    const [addRequestData, setAddRequestData] = useState({
      name: "",
      type: "",
      description: "",
      example: "",
    });
    const [requestList,setRequestList] = useState([])
    const [responseList,setResponseList] = useState([])
    const [data, setData] = useState("")

    const onEndpointChange = e => {
        setDataEndpoint({
        ...dataEndpoint,
        [e.target.name]: e.target.value
        })
    }

    const onDataChahe = e => {
        setData(e.target.value)
    }

    const onSelectMethod = e => {
        setSelectMethod(e.target.value)
    }

    const onGetParameter = e => {
        setGetParameter(e.target.value)
    }

    const onMethodData = e => {
        setMethodData({
            ...methodData,
            [e.target.name]: e.target.value
        })
    }

    const ClearArea = () => {
        setData("")
        setDataEndpoint("")
    }

    const openAddResponse = () => {
        addResponse ? setAddResponse(false) : setAddResponse(true)
    }

    const openAddRequest = () => {
      addRequestBox ? setAddRequestBox(false) : setAddRequestBox(true);
    };

    const checkContent = () => {
        addResponseData.content ? addResponseData.content = false : addResponseData.content = true
    }

    const checkSecurity = () => {
        methodData.security
          ? (methodData.security = false)
          : (methodData.security = true);
    }

    const getPrarameterData = e => {
      setParameterData({
        ...parameterData,
        [e.target.name]: e.target.value
      })
    }

    const onRequestData = (e) => {
      setAddRequestData({
        ...addRequestData,
        [e.target.name]: e.target.value,
      });
      console.log(addRequestData)
      if (
        addRequestData.name !== "" &&
        addRequestData.type !== "" &&
        addRequestData.description !== "" &&
        addRequestData.example !== ""
      ) {
        setAddRequestBox(true);
        setAddRequest(true);
      }
    };

    const AddNewRequest = () => {
      // addRequestData, setAddRequestData;
      if(addRequest){
            requestList.push({
              name: addRequestData.name,
              type: addRequestData.type,
              description: addRequestData.description,
              example: addRequestData.example,
            });
            setAddRequest(false)
            setAddRequestBox(false);
            addRequestData.name = ""
            addRequestData.type = ""
            addRequestData.description= ""
            addRequestData.example = ""
        }
      }
    
    const RemoveRequest = (e) => {
      let existed = requestList.find((data) => data.name === e.target.value);
      if (existed) {
        let afterData = requestList.filter(
          (data) => data.name !== e.target.value
        );
        setRequestList(afterData);
      }
    };

    const onResponseData = (e) => {
      setAddResponseData({
        ...addResponseData,
        [e.target.name]: e.target.value,
      });
      if (addResponseData.status !== "" && addResponseData.description !== "") {
        setAddResponse(true);
        setAddData(true);
      }
    };

    const AddNewResponse = () => {
        if(addData){
            responseList.push({
                status: addResponseData.status,
                description: addResponseData.description,
                content: addResponseData.content
            })
            setAddResponse(false)
            setAddData(false)
            addResponseData.status = ""
            addResponseData.description = ""
            addResponseData.content = false
        }
    }


    const RemoveResponse = (e) => {
      let existed = responseList.find((data) => data.status === e.target.value);
      if (existed) {
        let afterData = responseList.filter(
          (data) => data.status !== e.target.value
        );
        setResponseList(afterData);
      }
    };

    
    const GenerateYAML = () => {
        let listDataforYAML = []
        if(selectMethod === "get" && getParameter === "has_parameter"){
          listDataforYAML.push(`components:`)
          listDataforYAML.push(`  schemas:`)
          listDataforYAML.push(`    ${dataEndpoint.endpoint}:`)
          listDataforYAML.push(`      type: ${parameterData.type}`)
          listDataforYAML.push(`      example: ${parameterData.example}`)
        }
        if (
          selectMethod === "post" ||
          selectMethod === "put" ||
          selectMethod === "delete"
        ) {
          listDataforYAML.push(`components:`)
          listDataforYAML.push(`  schemas:`)
          listDataforYAML.push(`    ${dataEndpoint.endpoint}:`)
          listDataforYAML.push(`      type: object`)
          if (requestList.length > 0){
            listDataforYAML.push(`      required:`)
            requestList.forEach((data,index)=>{
              listDataforYAML.push(`        - ${data.name}`)
            })
          }
          if (requestList.length > 0) {
            listDataforYAML.push(`      properties:`);
            requestList.forEach((data, index) => {
              listDataforYAML.push(`        ${data.name}:`);
              listDataforYAML.push(`          type:${data.type}`);
              listDataforYAML.push(`          description:${data.description}`);
            });
          }
          if (requestList.length > 0) {
            listDataforYAML.push(`      example: ${parameterData.example}`);
            requestList.forEach((data, index) => {
              listDataforYAML.push(`        ${data.name}: ${data.example}`);
            });
          }
        }
        if(selectMethod === "get" && dataEndpoint.endpoint !== ""){
          if(selectMethod === "get" && getParameter === "non_parameter"){
            listDataforYAML.push(`/${dataEndpoint.endpoint}:`)
          }else{
            listDataforYAML.push(`/${dataEndpoint.endpoint}/{${parameterData.name}}:`) 
          }
        }else if (selectMethod === "get" && dataEndpoint.endpoint === "") {
          if (selectMethod === "get" && getParameter === "non_parameter") {
            listDataforYAML.push(`/:`);
          } else {
            listDataforYAML.push(`/{${parameterData.name}}:`)
          }
        }else if (selectMethod === "post" || selectMethod === "put" || selectMethod === "delete") {
            listDataforYAML.push(`/${dataEndpoint.endpoint}:`)
        }

        listDataforYAML.push(`  ${selectMethod}:`);
        listDataforYAML.push(`    summary: ${methodData.summary}`)
        listDataforYAML.push(`    tags: [${methodData.tags}]`)
        listDataforYAML.push(`    description: ${methodData.description}`)
        if(methodData.security === true){
          listDataforYAML.push(`    security:`)
          listDataforYAML.push(`      - bearerAuth: []`);
        }
        if(selectMethod === "get" && getParameter === "has_parameter"){
          listDataforYAML.push(`    parameters:`)
          listDataforYAML.push(`      - in: path`)
          listDataforYAML.push(`        name: ${parameterData.name}`)
          listDataforYAML.push(`        description: ${parameterData.description}`)
          listDataforYAML.push(`        required: ${parameterData.required}`)
          listDataforYAML.push(`        schema:`)
          listDataforYAML.push(`          $ref: '#/components/schemas/${dataEndpoint.endpoint}'`)
        }
        if (
          selectMethod === "post" ||
          selectMethod === "put" ||
          selectMethod === "delete"
        ) {
          listDataforYAML.push(`    requestBody:`);
          listDataforYAML.push(`      required: true`);
          listDataforYAML.push(`      content:`);
          listDataforYAML.push(`        application/json:`);
          listDataforYAML.push(`          schema:`);
          listDataforYAML.push(`            $ref: '#/components/schemas/${dataEndpoint.endpoint}'`);
        }
        if(responseList.length > 0){
            listDataforYAML.push(`    responses:`)
            responseList.forEach((data, index) => {
                listDataforYAML.push(`      ${data.status}:`)
                listDataforYAML.push(`        description: ${data.description}`)
                if(data.content === true){
                    listDataforYAML.push(`        content:`)
                    listDataforYAML.push(`          apllication/json:`)
                    listDataforYAML.push(`            schema:`)
                    listDataforYAML.push(`              data:`)
                    listDataforYAML.push(`                type: string`)
                }
            })
        }
        let convert = listDataforYAML.toString().replaceAll(",",'\n')
        setData(convert)
        console.log('Generated!')
    }

    useEffect(()=>{
        copied && setTimeout(()=>{
            setCopied(false)
        },1000)
    })

    return (
      <MainPageWrapper>
        {copied && (
          <AlertAction>
            <AlertActionContent contenttext={"Copied!"} />
          </AlertAction>
        )}
        {addResponse && (
          <>
            <SchemaGenerateFormBox>
              <SchemaGenerateForm>
                <ContentTitle contenttext={"Add Response Data"} />
                <ContentSub>
                  <InputBox>
                    <ContentSubInputlabel
                      htmlFor="status"
                      contenttext={"Status Code:"}
                    />{" "}
                    &nbsp;
                    <ContentSubInputText
                      className={onResponseData.status !== "" ? "notempty" : ""}
                      onChange={onResponseData}
                      id="status"
                      name="status"
                      value={addResponseData.status}
                      placeholder="Ex.200"
                    />
                  </InputBox>
                </ContentSub>
                <ContentSub>
                  <InputBox>
                    <ContentSubInputlabel
                      htmlFor="description"
                      contenttext={"Description:"}
                    />{" "}
                    &nbsp;
                    <ContentSubInputText
                      className={
                        onResponseData.description !== "" ? "notempty" : ""
                      }
                      onChange={onResponseData}
                      id="description"
                      name="description"
                      value={addResponseData.description}
                      placeholder="Example"
                    />
                  </InputBox>
                </ContentSub>
                <ContentSub>
                  <InputBox>
                    <ContentSubInputlabel
                      htmlFor="content"
                      contenttext={"Response Content:"}
                    />{" "}
                    &nbsp;
                    <ContentSubInputCheckbox
                      onChange={checkContent}
                      id="content"
                      name="content"
                    />
                  </InputBox>
                </ContentSub>
                <FormBtn
                  primaryTheme
                  contenttext={"Add"}
                  onClick={AddNewResponse}
                />
                <FormBtn
                  secondaryTheme
                  contenttext={"Cancel"}
                  onClick={openAddResponse}
                />
              </SchemaGenerateForm>
            </SchemaGenerateFormBox>
          </>
        )}
        {addRequestBox && (
          <>
            <SchemaGenerateFormBox>
              <SchemaGenerateForm>
                <ContentTitle contenttext={"Add Request Data"} />
                <ContentSub>
                  <InputBox>
                    <ContentSubInputlabel
                      htmlFor="name"
                      contenttext={"Name:"}
                    />
                    &nbsp;
                    <ContentSubInputText
                      className={addRequestData.name !== "" ? "notempty" : ""}
                      onChange={onRequestData}
                      id="name"
                      name="name"
                      value={addRequestData.name}
                      placeholder="Example"
                    />
                  </InputBox>
                </ContentSub>
                <ContentSub>
                  <InputBox>
                    <ContentSubInputlabel
                      htmlFor="type"
                      contenttext={"Type:"}
                    />
                    &nbsp;
                    <ContentSubInputText
                      className={addRequestData.type !== "" ? "notempty" : ""}
                      onChange={onRequestData}
                      id="type"
                      name="type"
                      value={addRequestData.type}
                      placeholder="string"
                    />
                  </InputBox>
                </ContentSub>
                <ContentSub>
                  <InputBox>
                    <ContentSubInputlabel
                      htmlFor="description"
                      contenttext={"Description:"}
                    />
                    &nbsp;
                    <ContentSubInputText
                      className={
                        addRequestData.description !== "" ? "notempty" : ""
                      }
                      onChange={onRequestData}
                      id="description"
                      name="description"
                      value={addRequestData.description}
                      placeholder="Example"
                    />
                  </InputBox>
                </ContentSub>
                <ContentSub>
                  <InputBox>
                    <ContentSubInputlabel
                      htmlFor="example"
                      contenttext={"Example:"}
                    />
                    &nbsp;
                    <ContentSubInputText
                      className={
                        addRequestData.example !== "" ? "notempty" : ""
                      }
                      onChange={onRequestData}
                      id="example"
                      name="example"
                      value={addRequestData.example}
                      placeholder="Example"
                    />
                  </InputBox>
                </ContentSub>
                <FormBtn
                  primaryTheme
                  contenttext={"Add"}
                  onClick={AddNewRequest}
                />
                <FormBtn
                  secondaryTheme
                  contenttext={"Cancel"}
                  onClick={openAddRequest}
                />
              </SchemaGenerateForm>
            </SchemaGenerateFormBox>
          </>
        )}
        <MainHeader>
          <MainHeaderText>SwaggerUI YAML Documents Generator</MainHeaderText>
          <PageButton onClick={_=>history.push('/cal')}><FcCalculator size={"1.5vw"} /></PageButton>
        </MainHeader>
        <MainContentBody>
          <MainConntentBodyLeft>
            <ContentTitle contenttext={"Endpoint"} />
            <ContentSub>
              <InputBox>
                <ContentSubInputlabel htmlFor="endpoint" contenttext={"/"} />
                <ContentSubInputText
                  className={dataEndpoint.endpoint !== "" ? "notempty" : ""}
                  value={dataEndpoint.endpoint}
                  onChange={onEndpointChange}
                  id="endpoint"
                  name="endpoint"
                  placeholder="example"
                />
              </InputBox>
            </ContentSub>
            <ContentTitle contenttext={"Select Method"} />
            <ContentSub>
              <InputBox>
                <ContentSelect
                  name="methods"
                  id="select-methods"
                  onChange={onSelectMethod}
                  value={selectMethod}
                >
                  <ContentSelectOption value="get">GET</ContentSelectOption>
                  <ContentSelectOption value="post">POST</ContentSelectOption>
                  <ContentSelectOption value="put">PUT</ContentSelectOption>
                  <ContentSelectOption value="delete">
                    DELETE
                  </ContentSelectOption>
                </ContentSelect>
              </InputBox>
            </ContentSub>
            <ContentSub>
              <InputBox>
                <ContentSubInputlabel
                  htmlFor="summary"
                  contenttext={"Summary"}
                />{" "}
                &nbsp;
                <ContentSubInputText
                  className={methodData.summary !== "" ? "notempty" : ""}
                  value={methodData.summary}
                  onChange={onMethodData}
                  type="text"
                  id="summary"
                  name="summary"
                  placeholder="example"
                />
              </InputBox>
            </ContentSub>
            <ContentSub>
              <InputBox>
                <ContentSubInputlabel htmlFor="tags" contenttext={"Tags"} />{" "}
                &nbsp;
                <ContentSubInputText
                  className={methodData.tags !== "" ? "notempty" : ""}
                  value={methodData.tags}
                  onChange={onMethodData}
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="example"
                />
              </InputBox>
            </ContentSub>
            <ContentSub>
              <InputBox>
                <ContentSubInputlabel
                  htmlFor="description"
                  contenttext={"Description"}
                />{" "}
                &nbsp;
                <ContentSubInputText
                  className={methodData.description !== "" ? "notempty" : ""}
                  value={methodData.description}
                  onChange={onMethodData}
                  type="text"
                  id="description"
                  name="description"
                  placeholder="example"
                />
              </InputBox>
            </ContentSub>
            <ContentSub>
              <InputBox>
                <ContentSubInputlabel
                  htmlFor="security"
                  contenttext={"Security:"}
                />{" "}
                &nbsp;
                <ContentSubInputCheckbox
                  onChange={checkSecurity}
                  id="security"
                  name="security"
                />
              </InputBox>
            </ContentSub>
            {selectMethod === "get" && (
              <>
                <ContentTitle contenttext={"Parameter"} />
                <ContentSub>
                  <InputBox>
                    <ContentSelect
                      name="parameter"
                      id="select-parameter"
                      onChange={onGetParameter}
                      value={getParameter}
                    >
                      <ContentSelectOption value="non_parameter">
                        Non Parameter
                      </ContentSelectOption>
                      <ContentSelectOption value="has_parameter">
                        Has Parameter
                      </ContentSelectOption>
                    </ContentSelect>
                  </InputBox>
                </ContentSub>
              </>
            )}
            {selectMethod === "get" && getParameter === "has_parameter" && (
              <>
                <ContentSub>
                  <InputBox>
                    <ContentSubInputlabel
                      htmlFor="ParameterName"
                      contenttext={"Parameter Name"}
                    />{" "}
                    &nbsp;
                    <ContentSubInputText
                      className={parameterData.name !== "" ? "notempty" : ""}
                      value={parameterData.name}
                      onChange={getPrarameterData}
                      id="ParameterName"
                      name="name"
                      placeholder="example"
                    />
                  </InputBox>
                </ContentSub>
                <ContentSub>
                  <InputBox>
                    <ContentSubInputlabel
                      htmlFor="ParameterDescription"
                      contenttext={"Parameter Description"}
                    />{" "}
                    &nbsp;
                    <ContentSubInputText
                      className={
                        parameterData.description !== "" ? "notempty" : ""
                      }
                      value={parameterData.description}
                      onChange={getPrarameterData}
                      id="ParameterDescription"
                      name="description"
                      placeholder="example"
                    />
                  </InputBox>
                </ContentSub>
                <ContentSub>
                  <InputBox>
                    <ContentSubInputlabel
                      htmlFor="ParameterType"
                      contenttext={"Parameter Type"}
                    />{" "}
                    &nbsp;
                    <ContentSubInputText
                      className={parameterData.type !== "" ? "notempty" : ""}
                      value={parameterData.type}
                      onChange={getPrarameterData}
                      id="ParameterType"
                      name="type"
                      placeholder="integer"
                    />
                  </InputBox>
                </ContentSub>
                <ContentSub>
                  <InputBox>
                    <ContentSubInputlabel
                      htmlFor="example"
                      contenttext={"Example"}
                    />{" "}
                    &nbsp;
                    <ContentSubInputText
                      className={parameterData.example !== "" ? "notempty" : ""}
                      value={parameterData.example}
                      onChange={getPrarameterData}
                      id="example"
                      name="example"
                      placeholder="Example"
                    />
                  </InputBox>
                </ContentSub>
              </>
            )}
            {selectMethod === "post" ? (
              <>
                <ContentTitle contenttext={"Request Post Body"} />
                <AddBtn contenttext={"+Add"} onClick={openAddRequest} />
                <DataList>
                  {requestList.length > 0 ? (
                    requestList.map((data, index) => (
                      <DataListItemsBox key={`${data.name}-${index}`}>
                        <DataListItems>{data.name}</DataListItems>
                        <DeleteDataItems
                          value={data.name}
                          onClick={RemoveRequest}
                        >
                          x
                        </DeleteDataItems>
                      </DataListItemsBox>
                    ))
                  ) : (
                    <DataListItemsBox>
                      <DataListItems>None!</DataListItems>
                    </DataListItemsBox>
                  )}
                </DataList>
              </>
            ) : selectMethod === "put" ? (
              <>
                <ContentTitle contenttext={"Request Put Body"} />
                <AddBtn contenttext={"+Add"} onClick={openAddRequest} />
                <DataList>
                  {requestList.length > 0 ? (
                    requestList.map((data, index) => (
                      <DataListItemsBox key={`${data.name}-${index}`}>
                        <DataListItems>{data.name}</DataListItems>
                        <DeleteDataItems
                          value={data.name}
                          onClick={RemoveRequest}
                        >
                          x
                        </DeleteDataItems>
                      </DataListItemsBox>
                    ))
                  ) : (
                    <DataListItemsBox>
                      <DataListItems>None!</DataListItems>
                    </DataListItemsBox>
                  )}
                </DataList>
              </>
            ) : (
              selectMethod === "delete" && (
                <>
                  <ContentTitle contenttext={"Request Delete Body"} />
                  <AddBtn contenttext={"+Add"} onClick={openAddRequest} />
                  <DataList>
                    {requestList.length > 0 ? (
                      requestList.map((data, index) => (
                        <DataListItemsBox key={`${data.name}-${index}`}>
                          <DataListItems>{data.name}</DataListItems>
                          <DeleteDataItems
                            value={data.name}
                            onClick={RemoveRequest}
                          >
                            x
                          </DeleteDataItems>
                        </DataListItemsBox>
                      ))
                    ) : (
                      <DataListItemsBox>
                        <DataListItems>None!</DataListItems>
                      </DataListItemsBox>
                    )}
                  </DataList>
                </>
              )
            )}
            <ContentTitle contenttext={"Responses"} />
            <AddBtn contenttext={"+Add"} onClick={openAddResponse} />
            <DataList>
              {responseList.length > 0 ? (
                responseList.map((data, index) => (
                  <DataListItemsBox key={`${data.status}-${index}`}>
                    <DataListItems>
                      {data.status} {data.description}
                    </DataListItems>
                    <DeleteDataItems
                      value={data.status}
                      onClick={RemoveResponse}
                    >
                      x
                    </DeleteDataItems>
                  </DataListItemsBox>
                ))
              ) : (
                <DataListItemsBox>
                  <DataListItems>None!</DataListItems>
                </DataListItemsBox>
              )}
            </DataList>
          </MainConntentBodyLeft>
          <MainConntentBodyRight>
            <DisplayArea
              onChange={onDataChahe}
              name="yamldata"
              id="yamldata"
              placeholder="@swagger"
              value={data}
            />
            <ConsoleArea>
              <GenerateBtn onClick={GenerateYAML}>
                <FaPlay />
              </GenerateBtn>
              <CopyToClipboard text={data} onCopy={() => setCopied(true)}>
                <ConsoleButton>COPY</ConsoleButton>
              </CopyToClipboard>
              <ConsoleButton hotTheme onClick={ClearArea}>
                CLEAR
              </ConsoleButton>
            </ConsoleArea>
          </MainConntentBodyRight>
        </MainContentBody>
      </MainPageWrapper>
    );
}

export default Generator
