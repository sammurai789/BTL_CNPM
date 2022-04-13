function APIFeatures(mongooseQuery, reqQuery) {
    this.mongooseQuery = mongooseQuery;
    this.reqQuery = reqQuery;

    this.paginating = () => {
        const page = this.reqQuery.page * 1 || 1;
        const limit = 2;
        const skip = limit * (page - 1);
        this.mongooseQuery = this.mongooseQuery.limit(limit).skip(skip);
        return this;
    }

    // this.sorting = () => {
    //     const sort = this.reqQuery.sort
    // }

    this.searching = () => {
        const search = this.reqQuery.search;
        if (search) {
            this.mongooseQuery = this.mongooseQuery.find({
                $text: {$search: search}
            });
        } else {
            this.mongooseQuery = this.mongooseQuery.find();
        }
        return this;
    }
}


module.exports = APIFeatures;