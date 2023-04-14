import { auth } from "../../../conf/databases";
import Repository from "../../../models/repository";

class AuthRepository extends Repository {

    constructor () {
        super(auth, 'Auth', 'auth');
    }

    registerRefreshToken ( obj ) {
        const ans = this.db.query('INSERT INTO refresh_tokens_table(token, expire, user) VALUES (?, ?, ?)', [
            obj.token,
            obj.expire,
            obj.user
        ]);
        return ans;
    }

    getRefreshToken ( obj ) {
        const ans = this.db.query('SELECT refresh_tokens_table.user AS user, fullname, rol FROM refresh_tokens_table \
                                   INNER JOIN sitefodi_users.user_table ON refresh_tokens_table.user = sitefodi_users.user_table.id \
                                   WHERE token = ? AND user = ?', [
            obj.token,
            obj.user
        ]);
        return ans;
    }

    removeRefreshToken ( obj ) {
        const ans = this.db.query('DELETE FROM refresh_tokens_table WHERE token = ? AND user = ?', [
            obj.token,
            obj.user
        ]);
        return ans;
    }
}

export default AuthRepository;