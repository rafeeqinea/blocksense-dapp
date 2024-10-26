// src/DarkModeToggle.js
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
    return (
        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    );
};

export default DarkModeToggle;
