import React, { Component } from 'react'
import { css } from 'glamor'

import Form from './components/Form'
import Notes from './components/Notes'

// For Amplify
// import { API, graphqlOperation } from 'aws-amplify'

// import { createNote, updateNote, deleteNote } from './graphql/mutations'
// import { listNotes } from './graphql/queries'
// For Amplify

class App extends Component {
  state = { notes: [], filter: 'none' }
  
  // For Amplify
  // async componentDidMount() {
  //   try {
  //     const { data: { listNotes: { items }}} = await API.graphql(graphqlOperation(listNotes))
  //     this.setState({ notes: items })
  //   } catch (err) {
  //     console.log('error fetching notes...', err)
  //   }
  // }
  // For Amplify
  
  createNote = async note => {
    const notes = [note, ...this.state.notes]
    const newNotes = this.state.notes
    this.setState({ notes })
    
    // For Amplify
    // try {
    //   const data = await API.graphql(graphqlOperation(createNote, { input: note }))
    //   this.setState({ notes: [data.data.createNote, ...newNotes] })
    // } catch (err) {
    //   console.log('error creating note..', err)
    // }
    // For Amplify
  }
  updateNote = async note => {
    const updatedNote = {
      ...note,
      status: note.status === 'new' ? 'completed' : 'new'
    }
    const index = this.state.notes.findIndex(i => i.id === note.id)
    const notes = [...this.state.notes]
    notes[index] = updatedNote
    this.setState({ notes })
    
    // For Amplify
    // try {
    //   await API.graphql(graphqlOperation(updateNote, { input: updatedNote }))
    // } catch (err) {
    //   console.log('error updating note...', err)
    // }
    // For Amplify
  }
  deleteNote = async note => {
    const input = { id: note.id }
    const notes = this.state.notes.filter(n => n.id !== note.id)
    this.setState({ notes })
    // For Amplify
    // try {
    //   await API.graphql(graphqlOperation(deleteNote, { input }))
    // } catch (err) {
    //   console.log('error deleting note...', err)
    // }
    // For Amplify
  }
  updateFilter = filter => this.setState({ filter })
  render() {
    let { notes, filter } = this.state
    if (filter === 'completed') {
      notes = notes.filter(n => n.status === 'completed')
    }
    if (filter === 'new') {
      notes = notes.filter(n => n.status === 'new')
    }
    return (
      <div {...css(styles.container)}>
        <p {...css(styles.title)}>メモ帳</p>
        <Form
          createNote={this.createNote}
        />
        <Notes
          notes={notes}
          deleteNote={this.deleteNote}
          updateNote={this.updateNote}
        />
        <div {...css(styles.bottomMenu)}>
          <p
            onClick={() => this.updateFilter('none')}
            {...css([ styles.menuItem, getStyle('none', filter)])}
          >すべて</p>
          <p
            onClick={() => this.updateFilter('completed')}
            {...css([styles.menuItem, getStyle('completed', filter)])}
          >対応済み</p>
          <p
            onClick={() => this.updateFilter('new')}
            {...css([styles.menuItem, getStyle('new', filter)])}
          >未対応</p>
        </div>
      </div>
    );
  }
}

function getStyle(type, filter) {
  if (type === filter) {
    return {
      fontWeight: 'bold'
    }
  }
}

const styles = {
  bottomMenu: {
    display: 'flex',
    marginTop: 10,
    justifyContent: 'center'
  },
  menuItem: {
    cursor: 'pointer',
    marginRight: 20
  },
  title: {
    fontSize: 44,
    margin: '10px 0px'
  },
  container: {
    textAlign: 'center'
  }
} 
export default App;

