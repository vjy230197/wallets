import React from 'react'
import classes from './Dashboard.module.css';

const Dashboard = () => {
    return (
        <div className={classes.dashboard}>
            <div className={classes.banner}>
            </div>
            <div className={`${classes.body}`}>
                <div>
                    <div className={classes.user_card}>
                        <div className={classes.user_wrapper}>
                            <div className={classes.user}>
                            </div>
                        </div>
                        <div className='mt-4 text-left'>
                            <h3>SELLER NAME</h3>
                        </div>
                        <div className='flex mt-2'>
                            <img className='me-3' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png" alt="" />
                            <div>{localStorage.getItem('address').substring(0, 6) + '...' + localStorage.getItem('address').substring(localStorage.getItem('address').length - 4, localStorage.getItem('address').length)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
