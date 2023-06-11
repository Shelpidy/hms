import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

class Appointment extends Model {
  public appointmentId!: number;
  public appointmentStatus!: 'completed' | 'pending' | 'cancel';
  public doctorId!: number;
  public reason?: string;
  public note?: string;
  public patientId!: number;
  public appointmentDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Appointment.init(
  {
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    appointmentStatus: {
      type: DataTypes.ENUM('completed', 'pending', 'cancel'),
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Doctors',
        key: 'doctorId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    reason: {
      type: DataTypes.STRING(800),
    },
    note: {
      type: DataTypes.STRING(8000),
    },
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Patients',
        key: 'patientId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    appointmentDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'Appointment',
    tableName: 'Appointments',
    timestamps: true,
    underscored: false,
  }
);

export default Appointment;
