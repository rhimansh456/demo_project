import { Footer } from 'antd/es/layout/layout'
import React from 'react'

function FileFoot() {
    return (
        <Footer className='container-fluid align-items-center file-foot bg-transparent' >
            <span className='d-flex justify-content-center align-items-center'>
                &copy; {new Date().getFullYear()}
                    <b>
                        Company | All Right Rserved.
                    </b>
            </span>
        </Footer>
    )
}

export default FileFoot