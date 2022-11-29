import React from 'react'
import {
    AppBar,
    Grid,
    Typography,
    Toolbar,
    Box,
    Button,
    useTheme,
    useMediaQuery
} from '@mui/material'
import imgNiñosConValor from '../Assets/img/logo-ncv2.png'
import DrawerComp from './DrawnerComp'
/* import NewUserForm from './NewUserForm'; */

var accesPermiss = sessionStorage.getItem('Access')
function Navbar() {
    const theme = useTheme()

    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    function handleClickViewUsers() {
        if (accesPermiss == 'CompleteAccess') {
            window.location.href = '/vista-usuarios'
        }
    }

    function handleClickFiles() {
        if (
            accesPermiss == 'CompleteAccess' ||
            accesPermiss == 'RestriccionAccess'
        ) {
            window.location.href = '/ninos'
        }
    }

    function handleClickAssets() {
        if (accesPermiss == 'CompleteAccess') {
            window.location.href = '/activos-fijos'
        }
    }
    function handleClickProfile() {
        
            window.location.href = '/perfil-ncv'
        
    }

    function handleClickHome() {
        window.location.href = '/inicio-ncv'
    }

    function handleClickExit() {
        sessionStorage.setItem('jwt', '')
        sessionStorage.setItem('Role', '')
        sessionStorage.setItem('Access', null)
        window.location.href = '/'
    }

    return (
        <AppBar sx={{ backgroundColor: '#5CD4E2' }}>
            <Toolbar>
                {isMatch ? (
                    <>
                        <Typography
                            sx={{
                                cursor: 'pointer',
                                flexGrow: 1,
                                display: { sm: 'block' }
                            }}
                        >
                            <img
                                onClick={handleClickHome}
                                height="60"
                                width="150"
                                src={imgNiñosConValor}
                                alt="Niños con Valor"
                                className="logo-img-nvar"
                            />
                        </Typography>

                        <DrawerComp />
                    </>
                ) : (
                    <Grid
                        sx={{ placeItems: 'center', color: '#023859' }}
                        container
                    >
                        <Typography
                            sx={{
                                cursor: 'pointer',
                                flexGrow: 1,
                                display: { sm: 'block' }
                            }}
                        >
                            <img
                                onClick={handleClickHome}
                                height="60"
                                width="150"
                                src={imgNiñosConValor}
                                alt="Niños con Valor"
                                className="logo-img-nvar"
                            />
                        </Typography>

                        <Box
                            sx={{
                                color: '#023859',
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            {accesPermiss == 'CompleteAccess' && (
                                <Button
                                    sx={{
                                        marginLeft: 5,
                                        textTransform: 'none'
                                    }}
                                    className="btn-users"
                                    color="inherit"
                                    onClick={handleClickViewUsers}
                                >
                                    Usuarios
                                </Button>
                            )}

                            {(accesPermiss == 'CompleteAccess' ||
                                accesPermiss == 'RestriccionAccess') && (
                                <Button
                                    sx={{
                                        marginLeft: 5,
                                        textTransform: 'none'
                                    }}
                                    className="btn-files"
                                    color="inherit"
                                    onClick={handleClickFiles}
                                >
                                    Niños
                                </Button>
                            )}

                            {accesPermiss == 'CompleteAccess' && (
                                <Button
                                    sx={{
                                        marginLeft: 5,
                                        textTransform: 'none'
                                    }}
                                    className="btn-activosFijos"
                                    color="inherit"
                                    onClick={handleClickAssets}
                                >
                                    Activos Fijos
                                </Button>
                            )}
                            <Button
                                sx={{ marginLeft: 5, textTransform: 'none' }}
                                color="inherit"
                                onClick={handleClickProfile}
                            >
                                Perfil
                            </Button>
                            <Button
                                sx={{ marginLeft: 5, textTransform: 'none' }}
                                color="inherit"
                                className="btn-exit"
                                onClick={handleClickExit}
                            >
                                Salir
                            </Button>
                        </Box>
                    </Grid>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
