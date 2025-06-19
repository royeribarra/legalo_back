import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LibroReclamaciones } from "./libro-reclamaciones.entity";
import { CreateLibroReclamacionesDto } from "./dto/create-libro-reclamaciones.dto";
import { UpdateLibroReclamacionesDto } from "./dto/update-libro-reclamaciones.dto";
import { ErrorManager } from "../../utils/error.manager";

@Injectable()
export class LibroReclamacionesService {
  constructor(
    @InjectRepository(LibroReclamaciones)
    private readonly libroRepo: Repository<LibroReclamaciones>
  ) {}

  public async create(dto: CreateLibroReclamacionesDto) {
    // const reclamo = await this.libroRepo.create(dto);
    const newReclamo = new LibroReclamaciones();
    newReclamo.descripcion = dto.descripcion;
    newReclamo.dni = dto.dni;
    newReclamo.email = dto.email;
    newReclamo.nombre = dto.nombre;
    newReclamo.telefono = dto.telefono;
    newReclamo.tipo = dto.tipo;
    try {
      const reclamo = await this.libroRepo.save(newReclamo);
      return {
        state: true,
        message: `Reclamo creado correctamente`,
        reclamo: reclamo,
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(queryParams?): Promise<LibroReclamaciones[]> {
    const query = this.libroRepo.createQueryBuilder('reclamos');
    try {
      const reclamos: LibroReclamaciones[] = await query.getMany();

      return reclamos;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: number): Promise<LibroReclamaciones> {
    const reclamo = await this.libroRepo.findOne({ where: { id } });
    if (!reclamo) throw new NotFoundException("Reclamo no encontrado");
    return reclamo;
  }

  async update(id: number, dto: UpdateLibroReclamacionesDto): Promise<LibroReclamaciones> {
    await this.findOne(id); // Lanza error si no existe
    await this.libroRepo.update(id, dto);
    return this.findOne(id);
  }

  async responderLibro(id: number, respuesta: string): Promise<LibroReclamaciones> {
    const libro = await this.findOne(id);
    libro.respuesta =  respuesta;
    await this.libroRepo.save(libro);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Lanza error si no existe
    await this.libroRepo.delete(id);
  }
}
