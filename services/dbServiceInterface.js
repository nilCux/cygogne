// An abstraction like an interface for the database service
//
// This is a simple abstraction for the database service. It is a singleton
// class that is instantiated once and then used throughout the application.
// It is a simple wrapper around the Alicloud for MongoDB.


'use strict';

class DBService {
    async init() {
        throw new Error('Not implemented');
    }
}