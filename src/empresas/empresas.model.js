import mongoose from 'mongoose';

const EmpresaSchema = mongoose.Schema({
  nombreE: {
    type: String,
    required: [true, "El nombre de la empresa es obligatorio"],
  },
  nivelImpacto: {
    type: String,
    required: [true, "El nivel de impacto es obligarorio"],
    unique: true,
  },
  años: {
    type: String,
    required: [true, "Los años de trayectoria son obligatorios"],
  },
  categoria: {
    type: String,
    required: [true, "La categoria de la empresa es obligatoria"],
  }
});

export default mongoose.model('empresa', EmpresaSchema);