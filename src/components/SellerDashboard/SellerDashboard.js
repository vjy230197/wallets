import React from 'react'
import Dashboard from '../../pages/Dashboard'
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import classes from './SellerDashboard.module.css';
import Collected from './Collected/Collected';

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
                        <Tab label="Collected" />
                        <Tab label="Created" />

                    </Tabs>
                </Paper>
                {/* <div>
                    {
                        value == 0 && <Collected></Collected>
                    }
                </div> */}
            </div>
        </>
    )
}

export default SelletDashboard