import React, { useEffect, useState } from 'react'
import firebase from './../../config/firebase'
import axios from 'axios'

export default function Success (props) {
  const loadInitialData = async () => {
    const id = props.match.params.id
    var doc = await firebase.collection('chalan').doc(id)
    doc.update({
      status: 1
    })

    var chalanDoc = await firebase
      .collection('chalan')
      .doc(id)
      .get()

    let headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')

    headers.append('Access-Control-Allow-Origin', 'http://localhost:5000')

    axios({
      method: 'POST',
      url: 'http://localhost:5000/send',
      headers,
      data: {
        name: chalanDoc.data().name,
        email: chalanDoc.data().email,
        messageHtml:
          `<p>You Payment done successful</p>`
      }
    }).then(response => {
      if (response.data.msg === 'success') {
        console.log("Success");
      } else if (response.data.msg === 'fail') {
        console.log("fail");
      }
    })
  }
  useEffect(() => {
    loadInitialData()
    return () => {}
  }, [])
  return <div>Payment Successful</div>
}
