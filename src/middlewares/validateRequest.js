const validateRequest = (schema, body = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[body], { abortEarly: false });
        if (error) {
            return res.status(400).json({
                errors: error.details.map((error) => error.message),
            });
        }
        next();
    };
};
export default validateRequest;
