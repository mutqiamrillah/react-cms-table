import { useState, useEffect } from "react"
import { 
    Input,
    Button,
    InputGroup,
    Select,
    Text,
    Flex,
    useToast,
    Progress
} from "@chakra-ui/react"

import { Search2Icon } from '@chakra-ui/icons'
import TableList from "./TableList"
import { useSelector, useDispatch } from "react-redux"
import { getList } from "action/tableList"
import { Loading } from 'ui-kit'

function Table({ tableList }) {
    const dispatch = useDispatch()
    const [list, setList] = useState(tableList)
    const [searchInput, setSearchInput] = useState('')
    const toast = useToast()

    useEffect(() => {
        setList(tableList)
    }, [tableList])

    const [valSearch, setValSearch] = useState({
      keyword: '',
      gender: '',
      sortBy: '',
      sortOrder: '',
      page: ''
    })
  
  useEffect(() => {
    dispatch(getList(valSearch))
  }, [valSearch])

  const setSearch = (e) => {
    setSearchInput(e.target.value)

    if (e.key === 'Enter' || valSearch === '') {
        setValSearch({
            ...valSearch,
            [e.target.name]: e.target.value
        })
    }
  }

  const onChangeOption = (e) => {
    setValSearch({
        ...valSearch,
        [e.target.name]: e.target.value
    })
  }
  
  const fnBtnSearch = () => {
    setValSearch({
        ...valSearch,
        keyword: searchInput
    })
  }
  
  const fnResetFilter = () => {
    setValSearch({
        ...valSearch,
        keyword: '',
        gender: ''
    })
    
    toast({
      title: 'Data has been reset',
      status: "success",
      duration: 1000,
      isClosable: true,
    })
  }

  return (
    <div>
        <Text padding="20px" fontSize="4xl">Example With Search and Filter</Text>
        <Flex padding="10px">
            <div style={{ marginLeft: '10px' }}>
                <label>Search</label>
                <div>
                    <InputGroup size="md">
                        <Input
                            name="keyword"
                            pr="4.5rem"
                            type="text"
                            placeholder="Search"
                            onKeyUp={(e) => setSearch(e)}
                        />
                        <Button colorScheme="blue" size="md" onClick={() => fnBtnSearch()}>
                            <Search2Icon cursor="pointer" color="white"/>
                        </Button>
                    </InputGroup>
                </div>
            </div>
            
            <div style={{ marginLeft: '10px' }}>
                <label>Gender</label>
                <Select value={valSearch.gender} name="gender" onChange={(e) => onChangeOption(e)}>
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Select>
            </div>
            
            <div style={{ marginLeft: '10px' }}>
                <label>&nbsp;</label>
                <div>
                    <Button onClick={() => fnResetFilter()}>Reset Filter</Button>
                </div>
            </div>
        </Flex>
        
        {list.length ? 
          <TableList list={list}/> : <Loading/>
        }
        
    </div>
  )
}

function CmsPage() {
  const tableList = useSelector((state) => state.table)
  const dispatch = useDispatch()
  const [valSearch] = useState({
    keyword: '',
    gender: '',
    sortBy: '',
    sortOrder: '',
    page: ''
  })

  useEffect(() => {
    dispatch(getList(valSearch))
  }, [dispatch])

  return <Table tableList={tableList} />
}

export default CmsPage
