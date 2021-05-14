import { Box, Button, Container, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import firebase from './../../config/firebase'

export default function Chalan (props) {
    const [chalanId, setChalanId] = useState("");
  const [chalanData, setChalanData] = useState({})
  const [loading, setLoading] = useState(true)

  const loadInitialData = async () => {
    setLoading(true)
    const id = props.match.params.id
    setChalanId(id);
    var doc = await firebase
      .collection('chalan')
      .doc(id)
      .get()
    console.log(doc.data())
    setChalanData(doc.data())
    setLoading(false)
  }
  function isDate (val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
  }

  function isObj (val) {
    return typeof val === 'object'
  }

  function stringifyValue (val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val)
    } else {
      return val
    }
  }

  function buildForm ({ action, params }) {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)

    Object.keys(params).forEach(key => {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      input.setAttribute('value', stringifyValue(params[key]))
      form.appendChild(input)
    })

    return form
  }

  function post (details) {
    const form = buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
  }

  const getData = data => {
    return fetch(`http://localhost:5000/api/payment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .catch(err => console.log(err))
  }

  const makePayment = () => {
      var amount = parseFloat(chalanData.amount)

    getData({chalanId:chalanId, amount: amount , email: chalanData.email }).then(response => {
      var information = {
        action: 'https://securegw-stage.paytm.in/order/process',
        params: response
      }
      post(information)
    })
  }


  useEffect(() => {
    loadInitialData()
    return () => {}
  }, [])
  return (
    <Box
      height='100vh'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      {loading ? (
        <Box>Loading...</Box>
      ) : (
        <Box>
          <Box display='flex'>
            <Box>Name</Box>
            <Box width='30px' />
            <Box>{chalanData.name}</Box>
          </Box>

          <Box display='flex'>
            <Box>Email</Box>
            <Box width='30px' />
            <Box>{chalanData.email}</Box>
          </Box>
          <Box display='flex'>
            <Box>Reason</Box>
            <Box width='30px' />
            <Box>{chalanData.offense}</Box>
          </Box>
          <Box display='flex'>
            <Box>Amount</Box>
            <Box width='30px' />
            <Box>{chalanData.amount}</Box>
          </Box>
          <Box display='flex'>
            <Box>Vehicle No</Box>
            <Box width='30px' />
            <Box>{chalanData.vehicleNo}</Box>
          </Box>
          <Box display='flex'>
            <Box>Payment Status</Box>
            <Box width='30px' />
            <Box>{chalanData.status === 0 ? 'Pending' : 'Done'}</Box>
          </Box>
          {chalanData.status === 0 ? (
            <Button onClick={makePayment}>Make Payment</Button>
          ) : (
            <></>
          )}
        </Box>
      )}
    </Box>
  )
}
