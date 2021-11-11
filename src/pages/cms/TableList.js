import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
  } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import React, { useState, useEffect } from "react"
import { getList } from "action/tableList"
  
const TableList = props => {
    const dispatch = useDispatch()
    let list = props.list
    const page =  new URLSearchParams(window.location.search).get('page')
    
    const [isSorting, setSorting] = useState(true)
    const [isKlikSort, setKlikSort] = useState('')
    
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
    
    const fnBtnSort = (column) => {
        setKlikSort(column)
        setSorting(!isSorting)

        if(isSorting){
            setValSearch({
                ...valSearch,
                sortOrder: 'ascending',
                sortBy: column
            })
        }else{
            setValSearch({
                ...valSearch,
                sortOrder: 'descending',
                sortBy: column
            })
        }
    }
    return (
        <>
            <Table variant="simple" marginTop="50px">
                <Thead>
                    <Tr>
                        <Th cursor="pointer" onClick={() => fnBtnSort('username')}>Username
                            {isKlikSort === 'username'? 
                            <span >
                                {isSorting ? 
                                     <TriangleDownIcon marginLeft="10px" aria-label="sorted descending" /> :
                                     <TriangleUpIcon marginLeft="10px" aria-label="sorted ascending" />
                                }
                            </span>
                            :
                            null}
                        </Th>
                        <Th cursor="pointer" onClick={() => fnBtnSort('name')}>Name
                            {isKlikSort === 'name'? 
                            <span >
                                {isSorting ? 
                                     <TriangleDownIcon marginLeft="10px" aria-label="sorted descending" />:
                                     <TriangleUpIcon marginLeft="10px" aria-label="sorted ascending" />
                                }
                            </span>
                            :
                            null}
                        </Th>
                        <Th cursor="pointer" onClick={() => fnBtnSort('email')}>Email
                            {isKlikSort === 'email'? 
                            <span >
                                {isSorting ? 
                                     <TriangleDownIcon marginLeft="10px" aria-label="sorted descending" />:
                                     <TriangleUpIcon marginLeft="10px" aria-label="sorted ascending" />
                                }
                            </span>
                            :
                            null}
                        </Th>
                        <Th>Gender</Th>
                        <Th cursor="pointer" onClick={() => fnBtnSort('registered')}>Registered Date
                            {isKlikSort === 'registered'? 
                            <span >
                                {isSorting ? 
                                     <TriangleDownIcon marginLeft="10px" aria-label="sorted descending" />:
                                     <TriangleUpIcon marginLeft="10px" aria-label="sorted ascending" />
                                }
                            </span>
                            :
                            null}
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {list.map(data => {
                        let date = new Date(data.registered.date);
                        let date_convert = date.toLocaleString().replace(/[/]/g,'-').replace(/[,]/g,'');
                        return (
                            <Tr key={data.login.uuid}>
                                <Td>{data.login.username}</Td>
                                <Td>{data.name.first} {data.name.last}</Td>
                                <Td>{data.email}</Td>
                                <Td>{data.gender}</Td>
                                <Td>{date_convert}</Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </>
      )
  }
  
  export default TableList