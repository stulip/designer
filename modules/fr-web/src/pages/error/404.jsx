/**
 * 404 页面
 */
import React from 'react';

import _404 from 'fr-art/errors/404.jpg';

export default () => (
    <div className={'_404'}>
        <img src={_404}/>
        <p className="remind">您访问的页面不存在！</p>
    </div>
)
