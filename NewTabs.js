import React, { Component } from "react";
import {
    withStyles,
    AppBar,
    Tabs,
    Tab,
    Grid,
    Button
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import cloneDeep from "lodash/cloneDeep";
import defaultImage from '../images/uploadimg.jpg';
import { TabPanel } from '../components/TabPanel';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CancelPresentationSharpIcon from '@material-ui/icons/CancelPresentationSharp';
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop:"60px",
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    appBar:{
        color:"inherit",
        backgroundColor: theme.palette.background.paper
    }
});

class CustomTabs extends Component {
    constructor(...args){
        super(...args);
        this.state = {
            value: 0,
            tabList : [{
                key:0,
                id:0,
            }],
            images:[]
        };
    }
    newTab = e => {
        if (e.target.files && e.target.files.length > 0) {
            this.addTab(e.target.files[0])
        }
    };

    addTab = (e) => {
        this.setState((state,props)=>{
            let tabList = cloneDeep(state.tabList);
            let id = tabList[tabList.length-1].id+1;
            tabList.push({
                key:id,
                id:id,
            });
            let reader = new FileReader();
            reader.readAsDataURL(e);
            reader.addEventListener("load", () => {
                this.addImage(reader.result,id);
            });
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
            this.setState({value: id})
            return {
                tabList,
            }
        })
        console.log('All images : ',this.state.images)
    }
    
    addImage = (img,id) => {
        // console.log({img,id})
        
        this.setState((state)=>{
            if(state.images.find(v => v.id == id)){
                // console.log('oldimage',state.images.find(v => v.id == id).image)
                state.images.find(v => v.id == id).image=img
                // console.log('newimage',state.images.find(v => v.id == id).image)
            }else{
                let imgs = this.state.images;
                imgs.push({
                    id,
                    image:img
                })
                this.setState({
                    images:imgs
                })
            }
        })
        this.setState({value: id})
    }

    deleteTab = (e,closeTabId) => {
        e.stopPropagation();
        if(this.state.tabList.length === 1){
            return; 
        }
        if(this.state.images.length){
            this.setState((state)=>{
                state.images = state.images.filter((item)=>item.id!=closeTabId)
            })
        }
        let tabID = parseInt(e.target.id);
        let tabIDIndex = 0;
        let tabList = this.state.tabList.filter((value,index)=>{
            if(value.id === tabID){
                tabIDIndex = index;
            }
            return value.id !== tabID;
        });
        this.setState((state,props)=>{
            let curValue = parseInt(state.value);
            if(curValue === tabID){
                if(tabIDIndex === 0){
                    curValue = state.tabList[tabIDIndex+1].id
                }
                else{
                    curValue = state.tabList[tabIDIndex-1].id
                }
            }
            return {
                value:curValue
            }
        },()=>{
            this.setState({
                tabList
            })
        });
    }

    handleTabChange = (event, value) => {
        this.setState({ value });   
    }
    
    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
          <React.Fragment>
          <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                >
                    <Grid
                        item
                        xl={11}
                        lg={11}
                        md={11}
                        sm={8}
                        xs={11}
                    >
                        <Tabs
                            value={value}
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            {
                                this.state.tabList.map((tab)=>(
                                    <Tab
                                        key={tab.id}
                                        value={tab.id}
                                        label={"Node "+tab.id}
                                        icon={
                                            <CancelPresentationSharpIcon
                                                style={{width:"100"}}
                                                id={tab.id}
                                                onClick={
                                                    e => this.deleteTab(e, tab.id)
                                                }
                                            />
                                        }
                                        className={"mytab"+tab.is}
                                    />
                                    
                                ))
                            }
                        </Tabs>
                    </Grid>
                    <Grid
                        item
                        xl={1}
                        lg={1}
                        md={1}
                        sm={4}
                        xs={1}
                    >
                        <Button
                            variant="outlined"
                            component="label"
                            >
                            <Add/>
                            <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={this.newTab}
                            />
                        </Button>
                    </Grid>
                </Grid>
            </AppBar>
            <div>
                {
                    this.state.tabList.map((tab, i)=>{
                        let con = this.state.images.find(v => v.id == tab.id);
                        // console.log('image',(con)?con.image:null)
                        let image = (con)?con.image:defaultImage
                        return (
                            <TabPanel 
                                value={value}
                                image={image} 
                                index={tab.id} 
                                key={i} 
                                addImage={this.addImage}
                            >
                            </TabPanel>
                        )
                    })
                }
            </div>
            </div>
      </React.Fragment>

        );
        
    }
}



export default withStyles(styles)(CustomTabs);
