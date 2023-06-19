import React from 'react'
import Dashboard from '../../pages/Dashboard'
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import classes from './SellerDashboard.module.css';
import Collection from './Collections/Collection';

const SelletDashboard = () => {

    const [value, setValue] = React.useState(0);

    return (
        <>
            <Dashboard />
            <div className={classes.seller_dashboard}>

                <Paper style={{ 'background': 'inherit', 'boxShadow': 'none' }}>
                    <Tabs
                        value={value}
                        textColor="primary"
                        indicatorColor="primary"
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <Tab label="Collections" className='me-3' />
                        <Tab label="Create NFT" />

                    </Tabs>
                </Paper>
                <hr style={{ 'borderBottom': '1px solid lightseagreen', 'opacity': 0.25 }} />

                <div>
                    {
                        value == 0 && <Collection></Collection>
                    }
                </div>
            </div>
        </>
    )
}

export default SelletDashboard