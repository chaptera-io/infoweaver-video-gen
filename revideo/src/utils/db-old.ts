class DB {
	db: Record<string, any>;

	constructor() {
		this.db = {};
	}

	set(key: string, value: any) {
		this.db[key] = value;
	}

    get(key: string) {
        return this.db[key];
    }

    toString() {
        return JSON.stringify(this.db, null, 2);
    }
}

export default new DB();
