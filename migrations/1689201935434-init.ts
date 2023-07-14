import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1689201935434 implements MigrationInterface {
    name = 'Init1689201935434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, \`edad\` int NULL, \`correo\` varchar(255) NOT NULL, \`usuario\` varchar(255) NOT NULL, \`contrasena\` varchar(255) NOT NULL, \`direccion\` varchar(255) NOT NULL, \`dni\` varchar(255) NOT NULL, \`telefono\` varchar(255) NOT NULL, \`distrito\` varchar(255) NULL, \`provincia\` varchar(255) NULL, \`rol_id\` int NULL, UNIQUE INDEX \`IDX_63665765c1a778a770c9bd585d\` (\`correo\`), UNIQUE INDEX \`IDX_0790a401b9d234fa921e9aa177\` (\`usuario\`), UNIQUE INDEX \`IDX_3fd196cb306bed4b2a2e7c3415\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`modulosWeb\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`codigo\` varchar(255) NOT NULL, \`orden\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_modulosWeb\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rol_id\` int NULL, \`modulo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sucursalescliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`direccion\` varchar(255) NOT NULL, \`distrito\` varchar(255) NOT NULL, \`provincia\` varchar(255) NOT NULL, \`contacto\` varchar(255) NOT NULL, \`numero_contacto\` varchar(255) NOT NULL, \`codigo_sucursal\` varchar(255) NOT NULL, \`latitud\` varchar(255) NOT NULL, \`longitud\` varchar(255) NOT NULL, \`cliente_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clientes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`contacto_principal\` varchar(255) NOT NULL, \`direccion\` varchar(255) NOT NULL, \`numero_contacto\` varchar(255) NOT NULL, \`codigo\` varchar(255) NOT NULL, \`certificaciones\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medidasSeguridadResiduo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` text NOT NULL, \`valor\` int NOT NULL, \`tipos_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tiposResiduo_medidasSeguridad\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`medida_seguridad_id\` int NULL, \`tipo_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`metodosTratamientoResiduo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` text NOT NULL, \`valor\` int NOT NULL, \`tipos_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tiposResiduo_metodosTratamiento\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`metodo_tratamiento_id\` int NULL, \`tipo_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`normativasResiduo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` text NOT NULL, \`valor\` int NOT NULL, \`tipos_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tiposResiduo_normativas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`normativa_id\` int NULL, \`tipo_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`propiedadesResiduo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` text NOT NULL, \`valor\` int NOT NULL, \`tipos_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tiposResiduo_propiedades\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`propiedad_id\` int NULL, \`tipo_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`residuos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`descripcion\` varchar(255) NOT NULL, \`nivel_peligro\` int NOT NULL, \`cantidad_generada\` int NOT NULL, \`tratamiento\` varchar(255) NOT NULL, \`disposicion_final\` varchar(255) NOT NULL, \`responsable\` varchar(255) NOT NULL, \`tipo_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`unidadesMedidaResiduo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`unidad_medida\` varchar(255) NOT NULL, \`descripcion\` text NOT NULL, \`factor_conversion\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tiposResiduo_unidadesMedida\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`unidad_medida_id\` int NULL, \`tipo_residuo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tiposResiduo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`codigo\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`nivel_peligro\` int NOT NULL, \`metodo_almacenamiento\` int NULL, \`disposicion_final\` varchar(255) NULL, \`responsable\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`etapaTracker\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, \`fecha_inicio\` varchar(255) NOT NULL, \`fecha_finalizacion\` varchar(255) NOT NULL, \`responsable\` varchar(255) NOT NULL, \`tracker_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`solicitudes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`codigo\` varchar(255) NULL, \`fecha_recoleccion\` varchar(255) NOT NULL, \`fecha_solicitud\` varchar(255) NOT NULL, \`empresa_solicitante\` int NOT NULL, \`sucursal_empresa_solicitante\` int NOT NULL, \`tipo_residuo\` int NOT NULL, \`unidad_medida\` int NOT NULL, \`cantidad\` int NOT NULL, \`cilindros\` int NULL, \`direccion_recoleccion\` varchar(255) NOT NULL, \`contacto_empresa\` varchar(255) NOT NULL, \`estado_solicitud\` int NOT NULL, \`observacion\` varchar(255) NULL, \`tracker_id\` int NULL, UNIQUE INDEX \`REL_6b96f6ca039193f6b73a227201\` (\`tracker_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tracker\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`etapa_actual\` int NOT NULL, \`fecha_inicio\` varchar(255) NOT NULL, \`fecha_completado\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, \`archivo\` varchar(255) NOT NULL, \`responsable_id\` int NULL, \`pedido_id\` int NULL, UNIQUE INDEX \`REL_651618c8fe5ea01281e78fd6f7\` (\`pedido_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`areasEmpresa\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NULL, \`responsable\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conductores\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, \`edad\` int NOT NULL, \`correo\` varchar(255) NOT NULL, \`usuario\` varchar(255) NOT NULL, \`contrasena\` varchar(255) NOT NULL, \`direccion\` varchar(255) NOT NULL, \`dni\` varchar(255) NOT NULL, \`telefono\` varchar(255) NOT NULL, \`licencia_conducir\` varchar(255) NOT NULL, \`fecha_contratacion\` varchar(255) NOT NULL, \`fecha_vencimiento_licencia\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL, \`historial_accidentes\` varchar(255) NOT NULL, \`vehiculo_asignado\` int NOT NULL, \`disponibilidad\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehiculos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`codigo\` varchar(255) NULL, \`placa\` varchar(255) NOT NULL, \`capacidad_carga\` int NOT NULL, \`unidad_medida\` int NOT NULL, \`certificado\` varchar(255) NULL, \`estado_mantenimiento\` varchar(255) NOT NULL, \`disponibilidad\` varchar(255) NOT NULL, \`responsable\` varchar(255) NOT NULL, \`vencimiento_mtc\` varchar(255) NULL, \`vencimiento_poliza\` varchar(255) NULL, \`vencimiento_rd\` varchar(255) NULL, \`vencimiento_soat\` varchar(255) NULL, \`tipo_vehiculo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tipos_vehiculo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD CONSTRAINT \`FK_9e519760a660751f4fa21453d3e\` FOREIGN KEY (\`rol_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_modulosWeb\` ADD CONSTRAINT \`FK_d11b443fd48e09d6bf90acb5ce6\` FOREIGN KEY (\`rol_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_modulosWeb\` ADD CONSTRAINT \`FK_a84da430e58b9d59866b885eef4\` FOREIGN KEY (\`modulo_id\`) REFERENCES \`modulosWeb\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sucursalescliente\` ADD CONSTRAINT \`FK_8183cb31d1ee6b23b92b4630ead\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`clientes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`residuos\` ADD CONSTRAINT \`FK_f95e65a625dc0f9e484b8cf6dc9\` FOREIGN KEY (\`tipo_residuo_id\`) REFERENCES \`tiposResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_unidadesMedida\` ADD CONSTRAINT \`FK_67fd1bafa81c457e6e6441047c4\` FOREIGN KEY (\`unidad_medida_id\`) REFERENCES \`unidadesMedidaResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_unidadesMedida\` ADD CONSTRAINT \`FK_f1b2b859b8214b232bca1ce3677\` FOREIGN KEY (\`tipo_residuo_id\`) REFERENCES \`tiposResiduo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`etapaTracker\` ADD CONSTRAINT \`FK_75cf4a8c171f00d4b979b76dcba\` FOREIGN KEY (\`tracker_id\`) REFERENCES \`tracker\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`solicitudes\` ADD CONSTRAINT \`FK_6b96f6ca039193f6b73a2272019\` FOREIGN KEY (\`tracker_id\`) REFERENCES \`tracker\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tracker\` ADD CONSTRAINT \`FK_36793a593c78d3c3a55e0eb17ba\` FOREIGN KEY (\`responsable_id\`) REFERENCES \`areasEmpresa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tracker\` ADD CONSTRAINT \`FK_651618c8fe5ea01281e78fd6f7f\` FOREIGN KEY (\`pedido_id\`) REFERENCES \`solicitudes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vehiculos\` ADD CONSTRAINT \`FK_5b27066764bbc88390155c10b94\` FOREIGN KEY (\`tipo_vehiculo_id\`) REFERENCES \`tipos_vehiculo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehiculos\` DROP FOREIGN KEY \`FK_5b27066764bbc88390155c10b94\``);
        await queryRunner.query(`ALTER TABLE \`tracker\` DROP FOREIGN KEY \`FK_651618c8fe5ea01281e78fd6f7f\``);
        await queryRunner.query(`ALTER TABLE \`tracker\` DROP FOREIGN KEY \`FK_36793a593c78d3c3a55e0eb17ba\``);
        await queryRunner.query(`ALTER TABLE \`solicitudes\` DROP FOREIGN KEY \`FK_6b96f6ca039193f6b73a2272019\``);
        await queryRunner.query(`ALTER TABLE \`etapaTracker\` DROP FOREIGN KEY \`FK_75cf4a8c171f00d4b979b76dcba\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_unidadesMedida\` DROP FOREIGN KEY \`FK_f1b2b859b8214b232bca1ce3677\``);
        await queryRunner.query(`ALTER TABLE \`tiposResiduo_unidadesMedida\` DROP FOREIGN KEY \`FK_67fd1bafa81c457e6e6441047c4\``);
        await queryRunner.query(`ALTER TABLE \`residuos\` DROP FOREIGN KEY \`FK_f95e65a625dc0f9e484b8cf6dc9\``);
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
        await queryRunner.query(`ALTER TABLE \`sucursalescliente\` DROP FOREIGN KEY \`FK_8183cb31d1ee6b23b92b4630ead\``);
        await queryRunner.query(`ALTER TABLE \`roles_modulosWeb\` DROP FOREIGN KEY \`FK_a84da430e58b9d59866b885eef4\``);
        await queryRunner.query(`ALTER TABLE \`roles_modulosWeb\` DROP FOREIGN KEY \`FK_d11b443fd48e09d6bf90acb5ce6\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP FOREIGN KEY \`FK_9e519760a660751f4fa21453d3e\``);
        await queryRunner.query(`DROP TABLE \`tipos_vehiculo\``);
        await queryRunner.query(`DROP TABLE \`vehiculos\``);
        await queryRunner.query(`DROP TABLE \`conductores\``);
        await queryRunner.query(`DROP TABLE \`areasEmpresa\``);
        await queryRunner.query(`DROP INDEX \`REL_651618c8fe5ea01281e78fd6f7\` ON \`tracker\``);
        await queryRunner.query(`DROP TABLE \`tracker\``);
        await queryRunner.query(`DROP INDEX \`REL_6b96f6ca039193f6b73a227201\` ON \`solicitudes\``);
        await queryRunner.query(`DROP TABLE \`solicitudes\``);
        await queryRunner.query(`DROP TABLE \`etapaTracker\``);
        await queryRunner.query(`DROP TABLE \`tiposResiduo\``);
        await queryRunner.query(`DROP TABLE \`tiposResiduo_unidadesMedida\``);
        await queryRunner.query(`DROP TABLE \`unidadesMedidaResiduo\``);
        await queryRunner.query(`DROP TABLE \`residuos\``);
        await queryRunner.query(`DROP TABLE \`tiposResiduo_propiedades\``);
        await queryRunner.query(`DROP TABLE \`propiedadesResiduo\``);
        await queryRunner.query(`DROP TABLE \`tiposResiduo_normativas\``);
        await queryRunner.query(`DROP TABLE \`normativasResiduo\``);
        await queryRunner.query(`DROP TABLE \`tiposResiduo_metodosTratamiento\``);
        await queryRunner.query(`DROP TABLE \`metodosTratamientoResiduo\``);
        await queryRunner.query(`DROP TABLE \`tiposResiduo_medidasSeguridad\``);
        await queryRunner.query(`DROP TABLE \`medidasSeguridadResiduo\``);
        await queryRunner.query(`DROP TABLE \`clientes\``);
        await queryRunner.query(`DROP TABLE \`sucursalescliente\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles_modulosWeb\``);
        await queryRunner.query(`DROP TABLE \`modulosWeb\``);
        await queryRunner.query(`DROP INDEX \`IDX_3fd196cb306bed4b2a2e7c3415\` ON \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_0790a401b9d234fa921e9aa177\` ON \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_63665765c1a778a770c9bd585d\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}