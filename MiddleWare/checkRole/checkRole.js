const express = require('express')

const checkRole = async (req, res, next) => {
    try {
        const isAdmin = req.user.isAdmin;
        if(isAdmin)
            next();
        else
            throw new Error('Access denied');
    } catch (err) {
        console.log(err.message);
        res.sendStatus(500);
    }
}

module.exports = {
    checkRole,
}