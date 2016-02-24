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
    {name:"surui",age:"25",sex:"man"},
    {name:"fengche",age:"25",sex:"man"}
])

var CommentItem = React.createClass({
    render:function(){
        return (
            <li>
                <span>{this.props.name}</span>
                <span>{this.props.age}</span>
                <span>{this.props.sex}</span>
            </li>
        )
    }
})

var CommentList= React.createClass({
    render:function(){
        var nodes = this.props.items.map(function(item,i){
            return <CommentItem key={"item-"+i} name={item.name} age={item.age} sex={item.sex}/>
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