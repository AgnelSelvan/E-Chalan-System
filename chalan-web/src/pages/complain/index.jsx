import { Box, Button, Container, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import firebase from './../../config/firebase'
import axios from 'axios'

export default function Complain () {
  const [no, setNo] = useState('')
  const [offense, setOffense] = useState('')
  const [amount, setAmount] = useState('')
  const handle = async () => {
    console.log('Hello')
    var doc = await firebase
      .collection('vehicles')
      .doc(no)
      .get()
    if (doc.data() == null) {
      alert('No such data exists in our record')
    } else {
      console.log('Hello' + doc.data().vehicleNo)
      var chalanDoc = firebase.collection('chalan').doc()
      chalanDoc
        .set({
          name: doc.data().name,
          vehicleNo: no,
          email: doc.data().email,
          offense,
          amount,
          status: 0
        })
        .then(() => {
          console.log(chalanDoc.id)
          let headers = new Headers()

          headers.append('Content-Type', 'application/json')
          headers.append('Accept', 'application/json')

          headers.append('Access-Control-Allow-Origin', 'http://localhost:5000')

          axios({
            method: 'POST',
            url: 'http://localhost:5000/send',
            headers,
            data: {
              name: doc.data().name,
              email: doc.data().email,
              messageHtml:
                `<p>You have <b>violated</b> the rules, So you have been charged for fine of ₹ ${amount} for offense: ${offense}, Please click on the link for payment</p></br><a href="http://localhost:3000/chalan/` +
                chalanDoc.id +
                `">Payment</a>`
            }
          }).then(response => {
            if (response.data.msg === 'success') {
              alert('Email sent, awesome!')
            } else if (response.data.msg === 'fail') {
              alert('Oops, something went wrong. Try again')
            }
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    }
  }
  return (
    <Box>
      
      <Box
        height='100vh'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        Generate Chalan
        <TextField
          variant='outlined'
          type='text'
          placeholder='Enter Vehicle No'
          onChange={val => {
            setNo(val.target.value)
          }}
        />
        <Box height='10px' />
        <TextField
          variant='outlined'
          type='text'
          placeholder='Enter Offense Reason'
          onChange={val => {
            setOffense(val.target.value)
          }}
        />
        <Box height='10px' />
        <TextField
          variant='outlined'
          type='text'
          color="green"
          placeholder='Enter Offense Amount'
          onChange={val => {
            setAmount(val.target.value)
          }}
        />
        <Button onClick={handle}>Submit</Button>
      </Box>
    </Box>
  )
}
