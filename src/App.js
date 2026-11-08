import React from 'react';
import Header from './components/Header';
import Users from './components/Users';
import AddUser from './components/AddUser';
import axios from 'axios'

const baseUrl = 'https://reqres.in/api/users?page=1'

class App extends React.Component{
        defaultAvatar = "https://i.pinimg.com/474x/fd/e0/05/fde005003e6ecd6ca3e7b8886da6e6d7.jpg?nii=t"

      constructor(props) {
        super(props)

        axios.get(baseUrl).then((res) => {
            this.setState({users: res.data.data})
        })

        this.state ={
            users: []
        }

        this.addUser = this.addUser.bind(this)
        this.editUser = this.editUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    render(){
        return (<div>
            <Header title = "Users list"/>
            <main>
                <Users users={this.state.users} onEdit={this.editUser} onDelete={this.deleteUser} />
            </main>
            <aside>
                <AddUser title = "Add" onAdd={this.addUser}/>
            </aside>
        </div>)
    }

    addUser(user) {
        console.log(this.state.users.length)
        let id = 1
        if(this.state.users.length !== 0) id = this.state.users[this.state.users.length - 1].id + 1
            
        
        this.setState({ users: [...this.state.users, {id, ...user}] })
    }

    editUser(user) {
        let allUsers = this.state.users
        if(user.first_name !== "") allUsers[user.id - 1].first_name = user.first_name
        if(user.last_name !== "") allUsers[user.id - 1].last_name = user.last_name
        if(user.email !== "") allUsers[user.id - 1].email = user.email
        if(user.avatar !== this.defaultAvatar) allUsers[user.id - 1].avatar = user.avatar
        if(user.avatar === "No") allUsers[user.id - 1].avatar = this.defaultAvatar
        allUsers[user.id - 1].isHappy = user.isHappy

        // allUsers[user.id - 1] = user

        this.setState({ users: []}, () => {
            this.setState({ users: [...allUsers] })
        })
    }

    deleteUser(id) {
        this.setState({
            users: [...this.state.users.filter((el) => el.id !== id)]
        })
    }
}

export default App