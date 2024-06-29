import React, { useState, useEffect } from 'react';
import { Badge, Button, ListGroup, Modal, Alert } from 'react-bootstrap';

export default function BudgetTracker() {
    const [budget, setBudget] = useState({});
    const [spent, setSpent] = useState({});
    const [remaining, setRemaining] = useState({});
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [search, setSearch] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [modalType, setModalType] = useState('');
    const [success, setSuccess] = useState(false);
    const [danger, setDanger] = useState(false);
    const [Index, setIndex] = useState({});

    useEffect(() => {
        setRemaining(budget - spent);
    }, [budget, spent]);

    const handleBudgetChange = (e) => {
        const value = parseFloat(e.target.value);
        setBudget(value);
    };

    const handleSpentChange = (e) => {
        const value = parseFloat(e.target.value);
        setSpent(value);
    };

    const budgetEdit = () => {
        console.log(`Budget set to: ${budget}`);
        console.log(`Spent: ${spent}`);
        console.log(`Remaining: ${remaining}`);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 800);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCostChange = (e) => {
        setCost(e.target.value);
    };

    const infoEdit = () => {
        const expenseCost = parseFloat(cost);
        if (name && !isNaN(expenseCost)) {
            const newExpense = { name, cost: expenseCost };
            setExpenses([...expenses, newExpense]);
            setSpent(spent + expenseCost);
            setName('');
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 800);
            setCost('');
            console.log(`Name: ${name}`);
            console.log(`Cost: ${expenseCost}`);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        const filteredExpenses = expenses.filter((expense) =>
            expense.name.toLowerCase().includes(value)
        );
        setFilteredExpenses(filteredExpenses);
    };

    const deletename = (index) => {
        const expenseToDelete = expenses[index];
        setExpenses(expenses.filter((_, i) => i !== index));
        setSpent(spent - expenseToDelete.cost);
        setDanger(true);
        setTimeout(() => {
            setDanger(false);
        }, 800);
    };

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = (type) => {
        setShow(true);
        setModalType(type);
    };
    const handleShowinfo = (type) => {
        setShow(true);
        setModalType(type);
    };

    const handleSaveChanges = () => {
        if (modalType === 'budget') {
            budgetEdit();
        } else if (modalType === 'info') {
            infoEdit();
        }
        handleClose();
    };

    const confirmDelete = () => {
        deletename(Index);
        setShowDelete(false);
    }
    const handleDelete = (index) => {
        setShowDelete(true);
        setIndex(index);
    }

    return (
        <div className="body">
            <div className="Expense-tracker">
                <h2>
                    Expense Tracker <Badge bg="secondary"></Badge>
                </h2>
                <div>
                    <input
                        className="input1"
                        type="number"
                        placeholder="Budget: "
                        value={budget}
                        onChange={handleBudgetChange}
                    />
                    <Button
                        className="button-edit"
                        variant="warning"
                        onClick={() => handleShow('budget')}
                    >
                        Edit
                    </Button>{' '}

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are you sure!!!</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <input
                        className="input2"
                        type="number"
                        placeholder="Remaining: "
                        value={remaining}
                        readOnly
                    />
                    <input
                        className="input3"
                        type="number"
                        placeholder="Spent so far: "
                        value={spent}
                        onChange={handleSpentChange}
                    />
                </div>
                <h3 className="h3-1">
                    Add expenses: <Badge bg="secondary"></Badge>
                </h3>
                <div className="info">
                    <p className="name">Name</p>
                    <p className="cost">Cost</p>
                </div>
                <input
                    className="input4"
                    type="text"
                    placeholder="Type here..."
                    value={name}
                    onChange={handleNameChange}
                />
                <input
                    className="input5"
                    type="number"
                    placeholder="Type here..."
                    value={cost}
                    onChange={handleCostChange}
                />

                <Button
                    className="button-save"
                    variant="success"
                    onClick={() => handleShowinfo('info')}
                >
                    Save
                </Button>{' '}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure!!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                {success && (
                    <Alert key={success} variant="success">
                        Successfully added!! -check it out!
                    </Alert>
                )}

                {danger && (
                    <Alert key={danger} variant="danger">
                        Successfully deleted!! -check it out!
                    </Alert>
                )}
                <div>
                    <h3 className="h3-2">
                        Expenses: <Badge bg="secondary"></Badge>
                    </h3>
                    <input
                        className="input6"
                        placeholder="Type to search..."
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                <ListGroup className="list-group">
                    {(search ? filteredExpenses : expenses).map((expense, index) => (
                        <ListGroup.Item
                            className="list-item"
                            action
                            variant="info"
                            key={index}
                        >
                            <pre>
                                {expense.name}                              {expense.cost}
                            </pre>
                            <Button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => handleDelete(index)}
                            >
                                {' '}
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>


                <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure!!! U want to delete it!?!?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={confirmDelete}>
                            Yes
                        </Button>
                        <Button variant="primary" onClick={() => setShowDelete(false)}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}