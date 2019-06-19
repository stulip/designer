/**
 * 404 页面
 */
import React from 'react';

const _404 = require("fr-art/errors/404.png");
export default () => (
    <div style={styles.main}>
        <img src={_404}/>
    </div>
)

const styles = {
    main: {
        paddingTop: 0,
        width: '100%',
        textAlign: 'center',
        background: '#fff',
        paddingBottom: 150,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};
