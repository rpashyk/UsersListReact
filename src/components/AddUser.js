import React from "react";
import validator from "validator";



class AddUser extends React.Component{
    userAdd = {}
    defaultAvatar = "https://i.pinimg.com/474x/fd/e0/05/fde005003e6ecd6ca3e7b8886da6e6d7.jpg?nii=t"
    isVisible = false

    constructor(props) {
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            avatar: this.defaultAvatar,
            email: "",
            isHappy: false
        }
    }

    render(){
        return(
            <form ref={(el) => this.myForm = el}>
                <input placeholder='Name' onChange={(e) => this.setState({first_name: e.target.value})} />
                <input placeholder='Last name' onChange={(e) => this.setState({last_name: e.target.value})} />
                <textarea placeholder='Avatar link' onChange={(e) => this.setState({avatar: e.target.value})} />
                <input placeholder='Email'  onChange={(e) => this.setState({email: e.target.value})} />
                {this.isVisible && (<label className = "errorEmail">Некорректный email             </label>)}
                <label htmlFor='isHappy'>Are you happy?</label>
                <input type="checkbox" id="isHappy" onChange={(e) => this.setState({isHappy: e.target.checked})} />
                <button type='button' onClick={() => {
                    if (this.state.email !== "" && !validator.isEmail(this.state.email)) {
                        this.isVisible = true
                    }else{
                        this.myForm.reset()
                        this.isVisible = false
                    
                        this.userAdd = {
                            first_name: this.state.first_name,
                            last_name: this.state.last_name,
                            avatar: this.state.avatar,
                            email: this.state.email,
                            isHappy: this.state.isHappy
                        }
                        if(this.props.user)
                            this.userAdd.id = this.props.user.id
                        this.props.onAdd(this.userAdd)
                        this.setState({
                            first_name: "",
                            last_name: "",
                            avatar: this.defaultAvatar,
                            email: "",
                            isHappy: false
                        })
                    }
                    
                }
                }>{this.props.title}</button>
                
            </form>
        )
    }

  
}

export default AddUser