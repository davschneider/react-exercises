import React from 'react';

class NoteEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            changedNote: {}
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log('We are in getDerivedStateFromProps');
        // We return the new version of state
        console.table(props.note);
        console.table(state.changedNote);

        if (props.note.id === state.changedNote.id) {
            return {
                ...state
            }
        } else {
            return {
                ...state,
                changedNote: {
                    ...props.note
                }
            }
        }
    }

    render() {

        return (
            <div>
                <form onSubmit={this._handleSubmit}>
                    <textarea 
                        value={this.state.changedNote.title}
                        onChange={(event) => {
                            this._updateLocalNote({
                                ...this.state.changedNote,
                                title: event.target.value
                            })
                        }}
                        // onChange={(event) => {
                        //     updateNoteTitle(event.target.value, note.id)
                        // }}
                        ></textarea>
                    <textarea
                        value={this.state.changedNote.copy} 
                        onChange={(event) => {
                            this._updateLocalNote({
                                ...this.state.changedNote,
                                copy: event.target.value
                            })
                        }}
                        // onChange={(event) => {
                        //     updateNoteContent(event.target.value, note.id)
                        // }}
                        ></textarea>
                        <br />
                        <button>Save</button>
                </form>
            </div>
        )
    } 
    
    _handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleChange(this.state.changedNote);
    }

    _updateLocalNote = (note) => {
        this.setState({
            changedNote: note
        });
    }
}

export default NoteEditor;