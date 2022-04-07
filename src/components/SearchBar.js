import React from 'react'
import '../css/SearchBar.css'
import { BsSearch, BsXCircle } from 'react-icons/bs'
import { useState } from 'react'
import { getUserData } from '../store/actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



function SearchBar() {
    const userData = useSelector(state => state.Auth.userData)
    const [search, setSearch] = useState(true)
    const [input, setInput] = useState('');
    const [filteredData, setFilteredData] = useState([])
    const [Canc, setCanc] = useState(false)




    const handeInput = async (e) => {
        setInput(e.target.value)
        const newFilter = userData.filter((value) => {
            return value.username.includes(input)
        })
         
        if(newFilter==''){
            setFilteredData('')
        }else{
            setFilteredData(newFilter)
        }
        return

    }
    const canc = () => {
        setInput('')
        setCanc(false)
        setFilteredData('')
    }
    const change = () => {
        setSearch(false)
        setCanc(true)
    }

    const renderResult = () => {
        return (
            filteredData.map((val) => {
                return (
                    <div>
                        {val.username}
                    </div>
                )
            })
        )
    }

    
    return (
        <div className='SearchContainer'>
            {search ? <BsSearch /> : null}


            <input value={input} placeholder='Cerca' onChange={handeInput} onClick={change} />
            {
                Canc ? <BsXCircle onClick={canc} /> : ''
            }
            {filteredData.length ?
                <div className='searchResult'>
                    <div className='result'>
                       <Link to={`/user/${filteredData[0].username}`}>
                          {renderResult()}  
                       </Link>                          
                        

                    </div>

                </div>:''
            

            }


        </div>
    )
}

export default SearchBar