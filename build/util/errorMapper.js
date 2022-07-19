export default function mapErrors(err) {
    if (Array.isArray(err)) {
        return err;
    }
    else if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors);
        return errors.map(function (e) {
            return ({ msg: e.message });
        });
    }
    else if (typeof err.message === 'string') {
        return [{ msg: err.message }];
    }
    else {
        return [{ msg: 'Request failed' }];
    }
}
