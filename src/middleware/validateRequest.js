export const validateRequest = (schema, target = "body") => {
    // { name, price...}
    return (req, res, next) => {
        const { error, value } = schema.validate(req[target], {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({
                error: "Dữ liệu không hợp lệ",
                details: error.details.map((err) => err.message),
            });
        }

        req[target] = value;
        next();
    };
};

// person.name
// person['name']
