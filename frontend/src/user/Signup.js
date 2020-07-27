import React, { useEffect } from 'react'

import { API } from '../config'
import Layout from '../core/Layout/Layout'

const Signup = () => (
  <Layout title='Signup Page' description='Signup Up'>
    <p>{API}</p>
  </Layout>
)

export default Signup
