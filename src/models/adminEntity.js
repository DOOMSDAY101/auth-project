const { EntitySchema } = require("typeorm");

const Admin = new EntitySchema({
    name: "Admin",
    tableName: "admins",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        username: {
            type: "varchar",
        },
        email: {
            type: "varchar",
            unique: true,
        },
        password: {
            type: "varchar",
        },
        created_at: {
            type: "timestamp",
            createDate: true,
        },
        date_of_birth: {
            type: "date",
            nullable: true,
        },
        permanent_address: {
            type: "varchar",
            nullable: true,
        },
        present_address: {
            type: "varchar",
            nullable: true,
        },
        city: {
            type: "varchar",
            nullable: true,
        },
        postal_code: {
            type: "varchar",
            nullable: true,
        },
        country: {
            type: "varchar",
            nullable: true,
        },
    },
});

module.exports = Admin;
