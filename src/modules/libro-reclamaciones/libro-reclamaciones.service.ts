import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LibroReclamaciones } from "./libro-reclamaciones.entity";
import { CreateLibroReclamacionesDto } from "./dto/create-libro-reclamaciones.dto";
import { UpdateLibroReclamacionesDto } from "./dto/update-libro-reclamaciones.dto";

@Injectable()
export class LibroReclamacionesService {
  constructor(
    @InjectRepository(LibroReclamaciones)
    private readonly libroRepo: Repository<LibroReclamaciones>
  ) {}

  async create(dto: CreateLibroReclamacionesDto): Promise<LibroReclamaciones> {
    const reclamo = this.libroRepo.create(dto);
    return this.libroRepo.save(reclamo);
  }

  async findAll(): Promise<LibroReclamaciones[]> {
    return this.libroRepo.find();
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

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Lanza error si no existe
    await this.libroRepo.delete(id);
  }
}
