import React, { Component } from "react";
import {
    Input,
    Button
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

export class TabPanel extends Component{
    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener("load", () => {
                this.props.addImage(reader.result,this.props.index);
            });
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    };
    render(){
            if ( this.props.value === this.props.index )
            return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={this.props.value !== this.props.index}
                id={`simple-tabpanel-${this.props.index}`}
                aria-labelledby={`simple-tab-${this.props.index}`}
            >
                <label htmlFor={"file-input"}>
                    <img src={this.props.image} height="400" width="400" alt="Yo Baby!"/>
                </label>
                <Button
                variant="contained"
                component="label"
                >
                    <Input
                        type="file" 
                        id="file-input" 
                        accept="image/*" 
                        onChange={this.onSelectFile}
                    />
                </Button> 
            </Typography>
            );  
        else return null;
    }
}
