export const authorization = (roles) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        if (roles.some(role => req.user.roles.includes(role))) {
            return next();  
        }

        return res.status(403).json({ message: 'No permissions' });  
    };
};

