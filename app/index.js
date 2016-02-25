/**
 * Created by xiaoxiaosu on 2016/2/24.
 */
var _ = require("underscore"),
    $ = require("jquery"),
    Backbone = require("backbone"),
    React = require("react"),
    ReactDOM = require("react-dom");

window.root={
    commentList : new Backbone.Collection()
}

root.commentList.reset([
    {name:"surui",age:"25",sex:"man",id:1},
    {name:"fengche",age:"25",sex:"man",id:2}
])

var CommentItem = React.createClass({
    getInitialState:function(){
        return {
            display:"none",
            text:"edit",
            name:this.props.name,
            age:this.props.age,
            sex:this.props.sex
        }
    },

    render:function(){

        return (
            <li>
                <p ref="name" >
                    <span >{this.props.name}</span>
                    <input style={{display:this.state.display}} value={this.state.name} onChange={this.handleChange.bind(this,'name')}/>
                </p>
                <p ref="age" >
                    <span >{this.props.age}</span>
                    <input style={{display:this.state.display}} value={this.state.age} onChange={this.handleChange.bind(this,'age')}/>
                </p>
                <p ref="sex">
                    <span >{this.props.sex}</span>
                    <input style={{display:this.state.display}} value={this.state.sex} onChange={this.handleChange.bind(this,'sex')}/>
                </p>
                <p>
                    <button onClick={this.handleClick}>{this.state.text}</button>
                </p>
            </li>
        )
    },
    handleClick:function(){
        var state = this.state.display
        if(state == 'none'){
            this.setState({
                display:"block",
                text:"save"
            })
        }else {
            var id = this.props.id
            var model = root.commentList.get(id)
            model.set(this.state)
            this.setState({
                display:"none",
                text:"edit"
            })
        }
    },
    handleChange:function(name,e){
        var obj = {}
        obj[name] = e.target.value
        this.setState(obj)
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({
            name:nextProps.name,
            age:nextProps.age,
            sex:nextProps.sex
        })
    }
})

var CommentList= React.createClass({
    render:function(){
        var nodes = this.props.items.map(function(item,i){
            return (
            <CommentItem
                key={"item-"+i}
                name={item.name}
                age={item.age}
                sex={item.sex}
                id ={item.id}
            />)
        })
        return (
            <ul>
                {nodes}
            </ul>
        )
    }
})

var CommentForm = React.createClass({
    getInitialState:function(){
        return {
            name:"",
            age:"",
            sex:""
        }
    },
    render:function(){
        return (
            <div className="comment-form">
                <p>
                    <label>name:</label>
                    <input value={this.state.name} onChange={this.change.bind(this,'name')}/>
                </p>
                <p>
                    <label>age:</label><input value={this.state.age}  onChange={this.change.bind(this,'age')}/>
                </p>
                <p>
                    <label>sex:</label><input value={this.state.sex}  onChange={this.change.bind(this,'sex')}/>
                </p>
                <button onClick={this.submit}>提交</button>
            </div>
        )
    },
    change:function(state,e){
        var s= {}
        s[state] = e.target.value
        this.setState(s)
    },
    submit:function(){
        root.commentList.add(this.state)
    }
})

var CommentBox = React.createClass({
    getInitialState:function(){
        return {
            items:root.commentList.toJSON()
        }
    },
    render:function(){
        var that = this
        return(
            <div className="comment-box">
                <CommentList items={that.state.items}/>
                <CommentForm/>
            </div>
        )
    },
    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this
        this.listenTo(root.commentList,'change add remove reset',function(){
            that.setState({
                items:root.commentList.toJSON()
            })
        })
    }
})
ReactDOM.render(<CommentBox/>,document.getElementById('root'))