import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1688426464207 implements MigrationInterface {
    name = 'Init1688426464207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`residuos\` DROP FOREIGN KEY \`FK_f95e65a625dc0f9e484b8cf6dc9\``);
        await queryRunner.query(`CREATE TABLE \`modulosWeb\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`codigo\` varchar(255) NOT NULL, \`orden\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_modulosWeb\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rol_id\` int NULL, \`modulo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medidasSeguridadResiduo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`valor\` int NOT NULL, \`tipos_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tiposResiduo_medidasSeguridad\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`medida_seguridad_id\` int NULL, \`tipo_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`metodosTratamientoResiduo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`valor\` int NOT NULL, \`tipos_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tiposResiduo_metodosTratamiento\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`metodo_tratamiento_id\` int NULL, \`tipo_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`normativasResiduo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`valor\` int NOT NULL, \`tipos_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tiposResiduo_normativas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`normativa_id\` int NULL, \`tipo_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`propiedadesResiduo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`valor\` int NOT NULL, \`tipos_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tiposResiduo_propiedades\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`propiedad_id\` int NULL, \`tipo_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tiposResiduo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`codigo\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`nivel_peligro\` int NOT NULL, \`metodo_almacenamiento\` int NOT NULL, \`tratamiento\` varchar(255) NOT NULL, \`disposicion_final\` varchar(255) NOT NULL, \`responsable\` varchar(255) NOT NULL, \`medidas_seguridad_id\` int NULL, \`metodos_tratamiento_id\` int NULL, \`normativas_id\` int NULL, \`propiedades_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sucursalesCliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`direccion\` varchar(255) NOT NULL, \`distrito\` varchar(255) NOT NULL, \`contacto\` varchar(255) NOT NULL, \`numero_contacto\` varchar(255) NOT NULL, \`codigo_sucursal\` varchar(255) NOT NULL, \`latitud\` varchar(255) NOT NULL, \`longitud\` varchar(255) NOT NULL, \`cliente_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`numero_contacto\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`codigo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles_modulosWeb\` ADD CONSTRAINT \`FK_d11b443fd48e09d6bf90acb5ce6\` FOREIGN KEY (\`rol_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_modulosWeb\` ADD CONSTRAINT \`FK_a84da430e58b9d59866b885eef4\` FOREIGN KEY (\`modulo_id\`) REFERENCES \`modulosWeb\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medidasSeguridadResiduo\` ADD CONSTRAINT \`FK_24823923da8f28f5b4774115eff\` FOREIGN KEY (\`tipos_residuo_id\`) REFERENCES \`tiposResiduo_medidasSeguridad\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_medidasSeguridad\` ADD CONSTRAINT \`FK_5235b176885b5f6b1f080a6dd86\` FOREIGN KEY (\`medida_seguridad_id\`) REFERENCES \`medidasSeguridadResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_medidasSeguridad\` ADD CONSTRAINT \`FK_bee97799f7fd74f5df3f86359fd\` FOREIGN KEY (\`tipo_residuo_id\`) REFERENCES \`tiposResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`metodosTratamientoResiduo\` ADD CONSTRAINT \`FK_d9e50da6d63a1b2f28e083db9cf\` FOREIGN KEY (\`tipos_residuo_id\`) REFERENCES \`tiposResiduo_metodosTratamiento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_metodosTratamiento\` ADD CONSTRAINT \`FK_826346fcb71959a8e4644dfba78\` FOREIGN KEY (\`metodo_tratamiento_id\`) REFERENCES \`metodosTratamientoResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_metodosTratamiento\` ADD CONSTRAINT \`FK_da1cc055c4e84000254832aafaa\` FOREIGN KEY (\`tipo_residuo_id\`) REFERENCES \`tiposResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`normativasResiduo\` ADD CONSTRAINT \`FK_1ec0f9df9990807956f6ec7b9ff\` FOREIGN KEY (\`tipos_residuo_id\`) REFERENCES \`tiposResiduo_normativas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_normativas\` ADD CONSTRAINT \`FK_a44c0788d03c6e049f137be801e\` FOREIGN KEY (\`normativa_id\`) REFERENCES \`normativasResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_normativas\` ADD CONSTRAINT \`FK_1b111cdcd64539ed468a97789c1\` FOREIGN KEY (\`tipo_residuo_id\`) REFERENCES \`tiposResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`propiedadesResiduo\` ADD CONSTRAINT \`FK_98d5f4dc5116d873e88fae22098\` FOREIGN KEY (\`tipos_residuo_id\`) REFERENCES \`tiposResiduo_propiedades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_propiedades\` ADD CONSTRAINT \`FK_f9c7c1a214f6f93d911e8ca3ce3\` FOREIGN KEY (\`propiedad_id\`) REFERENCES \`propiedadesResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_propiedades\` ADD CONSTRAINT \`FK_dbbfea85adf877951bf008fb3b9\` FOREIGN KEY (\`tipo_residuo_id\`) REFERENCES \`tiposResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo\` ADD CONSTRAINT \`FK_a38a3c81a892398d754389675ba\` FOREIGN KEY (\`medidas_seguridad_id\`) REFERENCES \`tiposResiduo_medidasSeguridad\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo\` ADD CONSTRAINT \`FK_891f51ad0c7a1885cfce6deed68\` FOREIGN KEY (\`metodos_tratamiento_id\`) REFERENCES \`tiposResiduo_metodosTratamiento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo\` ADD CONSTRAINT \`FK_e984d62f4c3d82fc14136cbf15d\` FOREIGN KEY (\`normativas_id\`) REFERENCES \`tiposResiduo_normativas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo\` ADD CONSTRAINT \`FK_63c153dbbffde30c1d05e7011ae\` FOREIGN KEY (\`propiedades_id\`) REFERENCES \`tiposResiduo_propiedades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`residuos\` ADD CONSTRAINT \`FK_f95e65a625dc0f9e484b8cf6dc9\` FOREIGN KEY (\`tipo_residuo_id\`) REFERENCES \`tiposResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sucursalesCliente\` ADD CONSTRAINT \`FK_5e4d92816f687ad993122fbc5bf\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`clientes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sucursalesCliente\` DROP FOREIGN KEY \`FK_5e4d92816f687ad993122fbc5bf\``);
        await queryRunner.query(`ALTER TABLE \`residuos\` DROP FOREIGN KEY \`FK_f95e65a625dc0f9e484b8cf6dc9\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo\` DROP FOREIGN KEY \`FK_63c153dbbffde30c1d05e7011ae\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo\` DROP FOREIGN KEY \`FK_e984d62f4c3d82fc14136cbf15d\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo\` DROP FOREIGN KEY \`FK_891f51ad0c7a1885cfce6deed68\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo\` DROP FOREIGN KEY \`FK_a38a3c81a892398d754389675ba\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_propiedades\` DROP FOREIGN KEY \`FK_dbbfea85adf877951bf008fb3b9\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_propiedades\` DROP FOREIGN KEY \`FK_f9c7c1a214f6f93d911e8ca3ce3\``);
        await queryRunner.query(`ALTER TABLE \`propiedadesResiduo\` DROP FOREIGN KEY \`FK_98d5f4dc5116d873e88fae22098\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_normativas\` DROP FOREIGN KEY \`FK_1b111cdcd64539ed468a97789c1\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_normativas\` DROP FOREIGN KEY \`FK_a44c0788d03c6e049f137be801e\``);
        await queryRunner.query(`ALTER TABLE \`normativasResiduo\` DROP FOREIGN KEY \`FK_1ec0f9df9990807956f6ec7b9ff\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_metodosTratamiento\` DROP FOREIGN KEY \`FK_da1cc055c4e84000254832aafaa\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_metodosTratamiento\` DROP FOREIGN KEY \`FK_826346fcb71959a8e4644dfba78\``);
        await queryRunner.query(`ALTER TABLE \`metodosTratamientoResiduo\` DROP FOREIGN KEY \`FK_d9e50da6d63a1b2f28e083db9cf\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_medidasSeguridad\` DROP FOREIGN KEY \`FK_bee97799f7fd74f5df3f86359fd\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_medidasSeguridad\` DROP FOREIGN KEY \`FK_5235b176885b5f6b1f080a6dd86\``);
        await queryRunner.query(`ALTER TABLE \`medidasSeguridadResiduo\` DROP FOREIGN KEY \`FK_24823923da8f28f5b4774115eff\``);
        await queryRunner.query(`ALTER TABLE \`roles_modulosWeb\` DROP FOREIGN KEY \`FK_a84da430e58b9d59866b885eef4\``);
        await queryRunner.query(`ALTER TABLE \`roles_modulosWeb\` DROP FOREIGN KEY \`FK_d11b443fd48e09d6bf90acb5ce6\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`codigo\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`numero_contacto\``);
        await queryRunner.query(`DROP TABLE \`sucursalesCliente\``);
        await queryRunner.query(`DROP TABLE \`tiposResiduo\``);
        await queryRunner.query(`DROP TABLE \`tiposResiduo_propiedades\``);
        await queryRunner.query(`DROP TABLE \`propiedadesResiduo\``);
        await queryRunner.query(`DROP TABLE \`tiposResiduo_normativas\``);
        await queryRunner.query(`DROP TABLE \`normativasResiduo\``);
        await queryRunner.query(`DROP TABLE \`tiposResiduo_metodosTratamiento\``);
        await queryRunner.query(`DROP TABLE \`metodosTratamientoResiduo\``);
        await queryRunner.query(`DROP TABLE \`tiposResiduo_medidasSeguridad\``);
        await queryRunner.query(`DROP TABLE \`medidasSeguridadResiduo\``);
        await queryRunner.query(`DROP TABLE \`roles_modulosWeb\``);
        await queryRunner.query(`DROP TABLE \`modulosWeb\``);
        await queryRunner.query(`ALTER TABLE \`residuos\` ADD CONSTRAINT \`FK_f95e65a625dc0f9e484b8cf6dc9\` FOREIGN KEY (\`tipo_residuo_id\`) REFERENCES \`tiposresiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
