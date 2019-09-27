import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CTX } from './Store';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'


const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        marginTop: '30px',
        padding: theme.spacing(3, 2)
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey',
        paddingRight: '15px'
    },
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '20px'
    },
    chatBox: {
        width: '85%',
    },
    button: {
        width: '15%',
        height: '54px',
        marginLeft: '15px'
    },
    borderLine: {
        borderTop: '1px solid grey',
        marginTop: '10px'
    },
    userMsg: {
        marginLeft: '5px',
    },
    chipMargin: {
        marginBottom: '2px',
    }

}));

// const LOCAL_STORAGE_KEY = 'chatApp.storage';

export default function Dashboard() {

    const classes = useStyles();

    // CTX store
    const { allChats, sendChatAction, user } = React.useContext(CTX);
    const topics = Object.keys(allChats);

    // local state
    const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
    const [textValue, changeTextValue] = React.useState('');

    // selected listItem
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    // local chat storage
    // const [localAllChats, setLocalAllChats] = useState(allChats)

    // useEffect(() => {
    //     const allChatsJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    //     if (allChatsJSON != null) {
    //         setLocalAllChats(JSON.parse(allChatsJSON))
    //     }
    // }, [allChats])

    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allChats))
    // }, [allChats])


    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chat App
                </Typography>
                <Typography variant="h5" component="h5">
                    {activeTopic}
                </Typography>

                <div className={classes.borderLine}></div>

                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map((topic, id) => (
                                    <ListItem
                                        selected={selectedIndex === id}
                                        onClick={e => { changeActiveTopic(e.target.innerText); handleListItemClick(id) }}
                                        key={topic}
                                        button>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>

                    <div className={classes.chatWindow}>
                        <PerfectScrollbar>
                            {
                                allChats[activeTopic].slice(0).reverse().map((chat, id) => (

                                    <div className={classes.flex} key={id}>

                                        <Chip label={chat.from} className={(classes.chip, classes.chipMargin)} />
                                        <Typography variant='body1' className={classes.userMsg}>
                                            {chat.message}
                                        </Typography>
                                    </div>
                                ))
                            }
                        </PerfectScrollbar>
                    </div>
                </div>

                <div className={classes.flex}>
                    <TextField
                        label="Send a chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={e => changeTextValue(e.target.value)}
                        variant="filled"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                            sendChatAction({ from: user, message: textValue, topic: activeTopic });
                            changeTextValue('');
                        }}
                    >
                        Send
                    </Button>

                </div>
            </Paper>
        </div>
    )
}
