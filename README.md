# dynamic-react-tab
This is the idea where you can share data between all tabs. In this i have simply used images component where in order to create new tab you have to give an image if haven't then that won't open but if you have then you can have all tab's images url on the console.


**To create new tab**
`newTab = e => {
        if (e.target.files && e.target.files.length > 0) {
            //if user have file then we need to open new tab with that image
            this.addTab(e.target.files[0])
        }
    };`
    
`addTab = (e) => {
        this.setState((state,props)=>{
            //cloning tab
            let tabList = cloneDeep(state.tabList);
            //find id
            let id = tabList[tabList.length-1].id+1;
            tabList.push({
                key:id,
                id:id,
            });
            //in order to read fileUrl
            let reader = new FileReader();
            reader.readAsDataURL(e);
            reader.addEventListener("load", () => {
                //send file url with id
                this.addImage(reader.result,id);
            });
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
            //re render component
            this.setState({value: id})
            return {
                tabList,
            }
        })
        console.log('All images : ',this.state.images)
    }`

`addImage = (img,id) => {
        this.setState((state)=>{
            //find if user update image in the same tab
            if(state.images.find(v => v.id == id)){
                //if yes then need to update
                state.images.find(v => v.id == id).image=img
            }else{
                //when user upload image first time in a tab
                let imgs = this.state.images;
                //push image in the images array
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
    }`
    
**Delete tab**
`deleteTab = (e,closeTabId) => {
        e.stopPropagation();
        /*if user want to last tab remain in tab list it will not delete if you want to delete it too then you can remove this if statement*/
        if(this.state.tabList.length === 1){
            return; 
        }
        //image is also need to delete from array 
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
    }`
    
**When user click on different tab.**

`handleTabChange = (event, value) => {
        //when user select tab need to render again with tab selected id
        this.setState({ value });   
    }`
    
**Remaining Logic you can find on files.**
